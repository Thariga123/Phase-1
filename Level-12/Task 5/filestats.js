const fs = require('fs');

const filePath = 'sample.txt';

fs.stat(filePath, (err, stats) => {
  if (err) {
    console.error(`Error reading file stats: ${err.message}`);
    return;
  }

  console.log(`📄 File: ${filePath}`);
  console.log(`📏 Size: ${stats.size} bytes`);
  console.log(`📅 Created: ${stats.birthtime.toLocaleString()}`);
  console.log(`📝 Last Modified: ${stats.mtime.toLocaleString()}`);
});
