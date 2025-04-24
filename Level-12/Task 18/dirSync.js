const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'source');
const targetDir = path.join(__dirname, 'target');

function syncDirectories(source, target) {
  try {
    const actions = {
      copied: [],
      updated: [],
      deleted: []
    };

    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }

    const sourceItems = new Set(fs.readdirSync(source));
    const targetItems = new Set(fs.existsSync(target) ? fs.readdirSync(target) : []);

    for (const item of sourceItems) {
      const srcPath = path.join(source, item);
      const tgtPath = path.join(target, item);
      const srcStat = fs.statSync(srcPath);

      if (srcStat.isDirectory()) {
        syncDirectories(srcPath, tgtPath);
      } else {
        if (!fs.existsSync(tgtPath)) {
          fs.copyFileSync(srcPath, tgtPath);
          actions.copied.push(tgtPath);
        } else {
          const tgtStat = fs.statSync(tgtPath);
          if (srcStat.mtimeMs > tgtStat.mtimeMs) {
            fs.copyFileSync(srcPath, tgtPath);
            actions.updated.push(tgtPath);
          }
        }
      }
    }

    
    for (const item of targetItems) {
      if (!sourceItems.has(item)) {
        const tgtPath = path.join(target, item);
        const tgtStat = fs.statSync(tgtPath);
        if (tgtStat.isDirectory()) {
          fs.rmSync(tgtPath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(tgtPath);
        }
        actions.deleted.push(tgtPath);
      }
    }

  
    console.log(`✅ Synchronization complete between:\n- Source: ${source}\n- Target: ${target}`);
    console.log(`📂 Copied: ${actions.copied.length}`);
    console.log(`✏️ Updated: ${actions.updated.length}`);
    console.log(`❌ Deleted: ${actions.deleted.length}`);
    if (actions.copied.length) console.log('Copied files:', actions.copied);
    if (actions.updated.length) console.log('Updated files:', actions.updated);
    if (actions.deleted.length) console.log('Deleted files:', actions.deleted);

  } catch (err) {
    console.error(`❌ Error during sync: ${err.message}`);
  }
}


function setupTestDirectories() {
  if (!fs.existsSync(sourceDir)) fs.mkdirSync(sourceDir);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);

  fs.writeFileSync(path.join(sourceDir, 'file1.txt'), 'Hello from source!');
  fs.writeFileSync(path.join(sourceDir, 'file2.txt'), 'Another file');
  fs.writeFileSync(path.join(targetDir, 'file2.txt'), 'Old version of file2');
  fs.writeFileSync(path.join(targetDir, 'file3.txt'), 'This should be deleted');
}

setupTestDirectories();
syncDirectories(sourceDir, targetDir);

