/**
 * IMAGE OPTIMIZATION SCRIPT - Select Châteaux
 *
 * Automatically optimizes all images > 500KB:
 * - Converts to WebP format (quality: 80)
 * - Resizes to max width 1920px (preserves aspect ratio)
 * - Backs up originals to /public/images-backup
 * - Generates detailed optimization report
 *
 * Usage:
 *   npm install sharp
 *   node scripts/optimize-images.js
 *
 * @requires sharp
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  // Source directory
  sourceDir: path.join(__dirname, '../public/images'),

  // Backup directory for originals
  backupDir: path.join(__dirname, '../public/images-backup'),

  // Optimization settings
  minFileSize: 500 * 1024, // 500KB threshold
  maxWidth: 1920, // Max width for web (4K not needed)
  webpQuality: 80, // WebP quality (80 = optimal balance)

  // File types to process
  extensions: ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'],
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Calculate reduction percentage
 */
function calcReduction(original, optimized) {
  return Math.round(((original - optimized) / original) * 100);
}

/**
 * Recursively get all files in directory
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

/**
 * Check if file needs optimization
 */
function needsOptimization(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stats = fs.statSync(filePath);

  return (
    CONFIG.extensions.includes(ext) &&
    stats.size > CONFIG.minFileSize &&
    !filePath.includes('images-backup') // Skip backup folder
  );
}

// ============================================
// OPTIMIZATION LOGIC
// ============================================

/**
 * Optimize single image
 */
async function optimizeImage(filePath) {
  try {
    const originalStats = fs.statSync(filePath);
    const originalSize = originalStats.size;

    // Get image metadata
    const metadata = await sharp(filePath).metadata();

    // Backup original file
    const relativePath = path.relative(CONFIG.sourceDir, filePath);
    const backupPath = path.join(CONFIG.backupDir, relativePath);
    const backupDir = path.dirname(backupPath);

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    fs.copyFileSync(filePath, backupPath);

    // Determine if resize needed
    const needsResize = metadata.width > CONFIG.maxWidth;

    // Optimize image
    let pipeline = sharp(filePath);

    if (needsResize) {
      pipeline = pipeline.resize(CONFIG.maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
    }

    // Convert to WebP
    const outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    await pipeline
      .webp({ quality: CONFIG.webpQuality })
      .toFile(outputPath);

    // Delete original if conversion successful
    if (outputPath !== filePath) {
      fs.unlinkSync(filePath);
    }

    // Get optimized file size
    const optimizedStats = fs.statSync(outputPath);
    const optimizedSize = optimizedStats.size;

    return {
      success: true,
      originalPath: path.basename(filePath),
      optimizedPath: path.basename(outputPath),
      originalSize,
      optimizedSize,
      originalDimensions: `${metadata.width}×${metadata.height}`,
      resized: needsResize,
      reduction: calcReduction(originalSize, optimizedSize),
    };

  } catch (error) {
    return {
      success: false,
      originalPath: path.basename(filePath),
      error: error.message,
    };
  }
}

/**
 * Main optimization routine
 */
async function optimizeAllImages() {
  console.log('\n🚀 SELECT CHÂTEAUX - IMAGE OPTIMIZATION STARTED\n');
  console.log('='.repeat(70));
  console.log(`📁 Source: ${CONFIG.sourceDir}`);
  console.log(`💾 Backup: ${CONFIG.backupDir}`);
  console.log(`⚙️  Settings: Max Width ${CONFIG.maxWidth}px | WebP Quality ${CONFIG.webpQuality}`);
  console.log(`📏 Threshold: Files > ${formatBytes(CONFIG.minFileSize)}`);
  console.log('='.repeat(70));
  console.log('\n');

  // Create backup directory
  if (!fs.existsSync(CONFIG.backupDir)) {
    fs.mkdirSync(CONFIG.backupDir, { recursive: true });
  }

  // Get all image files
  const allFiles = getAllFiles(CONFIG.sourceDir);
  const filesToOptimize = allFiles.filter(needsOptimization);

  console.log(`📊 Found ${allFiles.length} total images`);
  console.log(`🎯 ${filesToOptimize.length} images need optimization (>${formatBytes(CONFIG.minFileSize)})\n`);

  if (filesToOptimize.length === 0) {
    console.log('✅ All images already optimized!\n');
    return;
  }

  // Optimize each image
  const results = [];
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (let i = 0; i < filesToOptimize.length; i++) {
    const filePath = filesToOptimize[i];
    const fileName = path.basename(filePath);

    process.stdout.write(`[${i + 1}/${filesToOptimize.length}] Optimizing: ${fileName}...`);

    const result = await optimizeImage(filePath);
    results.push(result);

    if (result.success) {
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;

      process.stdout.write(` ✅ ${formatBytes(result.originalSize)} → ${formatBytes(result.optimizedSize)} (-${result.reduction}%)\n`);
    } else {
      process.stdout.write(` ❌ ERROR: ${result.error}\n`);
    }
  }

  // Generate report
  console.log('\n' + '='.repeat(70));
  console.log('📊 OPTIMIZATION REPORT');
  console.log('='.repeat(70));
  console.log('\n');

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Successfully optimized: ${successful.length}/${filesToOptimize.length} images`);
  if (failed.length > 0) {
    console.log(`❌ Failed: ${failed.length} images`);
  }
  console.log(`\n💾 Total original size: ${formatBytes(totalOriginalSize)}`);
  console.log(`🚀 Total optimized size: ${formatBytes(totalOptimizedSize)}`);
  console.log(`📉 Total reduction: ${formatBytes(totalOriginalSize - totalOptimizedSize)} (-${calcReduction(totalOriginalSize, totalOptimizedSize)}%)`);

  // Top 10 biggest reductions
  console.log('\n🏆 TOP 10 BIGGEST SIZE REDUCTIONS:\n');

  const sorted = successful
    .sort((a, b) => (b.originalSize - b.optimizedSize) - (a.originalSize - a.optimizedSize))
    .slice(0, 10);

  sorted.forEach((result, index) => {
    console.log(`${index + 1}. ${result.originalPath}`);
    console.log(`   ${formatBytes(result.originalSize)} → ${formatBytes(result.optimizedSize)} (-${result.reduction}%)`);
    if (result.resized) {
      console.log(`   📐 Resized from ${result.originalDimensions} to max ${CONFIG.maxWidth}px width`);
    }
    console.log('');
  });

  // Show failed files
  if (failed.length > 0) {
    console.log('❌ FAILED OPTIMIZATIONS:\n');
    failed.forEach(result => {
      console.log(`- ${result.originalPath}: ${result.error}`);
    });
    console.log('');
  }

  console.log('='.repeat(70));
  console.log('✨ OPTIMIZATION COMPLETE!');
  console.log(`💾 Original images backed up to: ${CONFIG.backupDir}`);
  console.log('='.repeat(70));
  console.log('\n');
}

// ============================================
// EXECUTE
// ============================================

optimizeAllImages()
  .then(() => {
    console.log('🎉 All done! Your site is now a rocket ship. 🚀\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
