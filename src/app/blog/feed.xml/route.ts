import { blogPosts } from "@/data/blog-posts";

const SITE_URL = "https://www.selectchateaux.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  // Trier par date décroissante, prendre les 50 derniers
  const sortedPosts = [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 50);


  const items = sortedPosts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${post.category}</category>
      <enclosure url="${SITE_URL}/api/images/${post.image.replace("/images/", "").replace(".webp", "")}" type="image/png" length="0" />
      <image>${SITE_URL}/api/images/${post.image.replace("/images/", "").replace(".webp", "")}</image>
      <author>seminaires@selectchateaux.com (${escapeXml(post.author.name)})</author>${post.social ? `
      <linkedinProfile><![CDATA[${post.social.linkedinProfile}]]></linkedinProfile>
      <linkedinCompany><![CDATA[${post.social.linkedinCompany}]]></linkedinCompany>
      <gmbPost><![CDATA[${post.social.gmb}]]></gmbPost>` : ''}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Select Châteaux — Blog Séminaires &amp; Événements</title>
    <link>${SITE_URL}/blog</link>
    <description>Conseils d'experts pour organiser vos séminaires, team buildings et événements d'entreprise en château. Guides, comparatifs et tendances 2026.</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>Select Châteaux</title>
      <link>${SITE_URL}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
