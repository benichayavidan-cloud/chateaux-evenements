#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const WEBP_MAGIC = Buffer.from([0x52, 0x49, 0x46, 0x46]);
const BASE64_CHARS = /^[A-Za-z0-9+/=\s]+$/;

function validateAndFixImage(filePath) {
  if (!fs.existsSync(filePath)) return { status: 'missing', path: filePath };

  const buf = fs.readFileSync(filePath);

  if (buf.slice(0, 4).equals(WEBP_MAGIC)) {
    return { status: 'valid', path: filePath, size: buf.length };
  }

  const text = buf.toString('utf-8').trim();
  if (BASE64_CHARS.test(text) && text.length > 100) {
    const decoded = Buffer.from(text, 'base64');
    if (decoded.slice(0, 4).equals(WEBP_MAGIC)) {
      fs.writeFileSync(filePath, decoded);
      return { status: 'fixed', path: filePath, originalSize: buf.length, fixedSize: decoded.length };
    }
  }

  return { status: 'invalid', path: filePath, size: buf.length, header: buf.slice(0, 16).toString('hex') };
}

const args = process.argv.slice(2);
const targetDir = args[0] || path.resolve(__dirname, '../../public/images');

if (args.includes('--file')) {
  const fileIdx = args.indexOf('--file');
  const result = validateAndFixImage(args[fileIdx + 1]);
  console.log(JSON.stringify(result));
  if (result.status === 'invalid' || result.status === 'missing') process.exit(1);
} else {
  const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.webp'));
  let fixed = 0, invalid = 0;
  for (const file of files) {
    const result = validateAndFixImage(path.join(targetDir, file));
    if (result.status !== 'valid') {
      console.log(JSON.stringify(result));
      if (result.status === 'fixed') fixed++;
      if (result.status === 'invalid') invalid++;
    }
  }
  console.log(JSON.stringify({ total: files.length, valid: files.length - fixed - invalid, fixed, invalid }));
  if (invalid > 0) process.exit(1);
}
