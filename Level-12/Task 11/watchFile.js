const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'source');
const targetDir = path.join(__dirname, 'target');

function syncDirectories(source, target) {
  try {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target);
      console.log(`📁 Created target directory: ${target}`);
    }

    const sourceFiles = fs.readdirSync(source);
    const targetFiles = fs.readdirSync(target);

    
    sourceFiles.forEach(file => {
      const srcPath = path.join(source, file);
      const tgtPath = path.join(target, file);
      const srcStat = fs.statSync(srcPath);

      if (srcStat.isDirectory()) {
        syncDirectories(srcPath, tgtPath);
      } else {
        const shouldCopy = !fs.existsSync(tgtPath) || fs.statSync(tgtPath).mtime < srcStat.mtime;
        if (shouldCopy) {
          fs.copyFileSync(srcPath, tgtPath);
          console.log(`📄 Copied/Updated: ${tgtPath}`);
        }
      }
    });

    
    targetFiles.forEach(file => {
      const srcPath = path.join(source, file);
      const tgtPath = path.join(target, file);

      if (!fs.existsSync(srcPath)) {
        fs.rmSync(tgtPath, { recursive: true, force: true });
        console.log(`🗑️ Deleted: ${tgtPath}`);
      }
    });

    console.log('✅ Synchronization complete.');
  } catch (err) {
    console.error('❌ Error during synchronization:', err.message);
  }
}

syncDirectories(sourceDir, targetDir);
