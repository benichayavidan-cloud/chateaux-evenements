#!/usr/bin/env node
const { google } = require('googleapis');
const fs = require('fs');
const {
  GSC_SITE_URL, GSC_CLIENT_ID, GSC_CLIENT_SECRET, GSC_REFRESH_TOKEN,
  ARTICLES_PATH,
} = require('./config');

function getAuthClient() {
  if (!GSC_CLIENT_ID || !GSC_CLIENT_SECRET || !GSC_REFRESH_TOKEN) {
    throw new Error('GSC credentials missing — set GSC_CLIENT_ID, GSC_CLIENT_SECRET, GSC_REFRESH_TOKEN env vars');
  }
  const oauth2Client = new google.auth.OAuth2(GSC_CLIENT_ID, GSC_CLIENT_SECRET, 'http://localhost');
  oauth2Client.setCredentials({ refresh_token: GSC_REFRESH_TOKEN });
  return oauth2Client;
}

function formatDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

function getExistingSlugs() {
  try {
    const content = fs.readFileSync(ARTICLES_PATH, 'utf-8');
    const slugs = [];
    const regex = /slug:\s*["']([^"']+)["']/g;
    let match;
    while ((match = regex.exec(content)) !== null) slugs.push(match[1]);
    return slugs;
  } catch {
    return [];
  }
}

async function pullGSCData(period = '30days', limit = 200) {
  const auth = getAuthClient();
  const sc = google.searchconsole({ version: 'v1', auth });
  const days = { '7days': 7, '30days': 30, '90days': 90, '16months': 480 }[period] || 30;
  const startDate = formatDate(days);
  const endDate = formatDate(0);

  const [queriesRes, pagesRes] = await Promise.all([
    sc.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: { startDate, endDate, dimensions: ['query'], rowLimit: limit, type: 'web' },
    }),
    sc.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: { startDate, endDate, dimensions: ['page'], rowLimit: limit, type: 'web' },
    }),
  ]);

  const queries = (queriesRes.data.rows || []).map(r => ({
    query: r.keys[0], clicks: r.clicks, impressions: r.impressions,
    ctr: +(r.ctr * 100).toFixed(1), position: +r.position.toFixed(1),
  }));

  const pages = (pagesRes.data.rows || []).map(r => ({
    page: r.keys[0].replace(GSC_SITE_URL.replace(/\/$/, ''), '') || '/',
    clicks: r.clicks, impressions: r.impressions,
    ctr: +(r.ctr * 100).toFixed(1), position: +r.position.toFixed(1),
  }));

  return { queries, pages, period, startDate, endDate };
}

function analyzeOpportunities(data) {
  const existingSlugs = getExistingSlugs();
  return {
    optimize: data.queries.filter(q => q.position >= 5 && q.position <= 25 && q.impressions >= 3)
      .sort((a, b) => b.impressions - a.impressions),
    newTerritory: data.queries.filter(q => q.position > 25 && q.impressions >= 2)
      .sort((a, b) => b.impressions - a.impressions),
    topPerformers: data.queries.filter(q => q.position <= 5)
      .sort((a, b) => b.impressions - a.impressions),
    underperformingPages: data.pages.filter(p => p.clicks === 0 && p.impressions >= 5)
      .sort((a, b) => b.impressions - a.impressions),
    existingSlugs,
    totalQueries: data.queries.length,
    totalPages: data.pages.length,
    period: data.period,
    dateRange: { start: data.startDate, end: data.endDate },
  };
}

async function main() {
  const args = process.argv.slice(2);
  const periodIdx = args.indexOf('--period');
  const limitIdx = args.indexOf('--limit');
  const period = periodIdx >= 0 ? args[periodIdx + 1] : '30days';
  const limit = limitIdx >= 0 ? parseInt(args[limitIdx + 1]) : 200;

  try {
    const data = await pullGSCData(period, limit);
    const analysis = analyzeOpportunities(data);
    console.log(JSON.stringify(analysis, null, 2));
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
