#!/usr/bin/env node
const sharp = require('sharp');
const { execSync } = require('child_process');
const fs = require('fs');
const { GEO_COORDS } = require('./config');

async function optimizeImage(inputPath, outputPath, city = 'paris') {
  const coords = GEO_COORDS[city] || GEO_COORDS['paris'];

  await sharp(inputPath)
    .resize(1200, 675, { fit: 'cover', position: 'center' })
    .webp({ quality: 80 })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);

  try {
    const latRef = coords.lat >= 0 ? 'N' : 'S';
    const lonRef = coords.lon >= 0 ? 'E' : 'W';
    execSync(
      `exiftool -overwrite_original ` +
      `-GPSLatitude=${Math.abs(coords.lat)} -GPSLatitudeRef=${latRef} ` +
      `-GPSLongitude=${Math.abs(coords.lon)} -GPSLongitudeRef=${lonRef} ` +
      `-XMP:GPSLatitude=${coords.lat} -XMP:GPSLongitude=${coords.lon} ` +
      `"${outputPath}"`,
      { stdio: 'pipe' }
    );
  } catch {
    // exiftool not available — skip geotag
  }

  return {
    path: outputPath, size: stats.size, sizeKB: Math.round(stats.size / 1024),
    dimensions: '1200x675', format: 'webp', city, geotagged: coords,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const inputIdx = args.indexOf('--input');
  const outputIdx = args.indexOf('--output');
  const cityIdx = args.indexOf('--city');

  if (inputIdx < 0 || outputIdx < 0) {
    console.error('Usage: node image-optimize.js --input source.png --output dest.webp [--city paris]');
    process.exit(1);
  }

  try {
    const result = await optimizeImage(args[inputIdx + 1], args[outputIdx + 1], cityIdx >= 0 ? args[cityIdx + 1] : 'paris');
    console.log(JSON.stringify(result));
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
}

main();
