const fs = require('fs');
const path = require('path');

const startDir = './testDirectory'; 


function readDirRecursive(dirPath) {
  fs.readdir(dirPath, (err, items) => {
    if (err) {
      console.error(` Error reading directory '${dirPath}': ${err.message}`);
      return;
    }

    items.forEach((item) => {
      const fullPath = path.join(dirPath, item);

      fs.stat(fullPath, (err, stats) => {
        if (err) {
          console.error(`Error reading stats for '${fullPath}': ${err.message}`);
          return;
        }

        if (stats.isDirectory()) {
          console.log(`[DIR]  ${fullPath}`);
          readDirRecursive(fullPath); 
          console.log(`[FILE] ${fullPath}`);
        }
      });
    });
  });
}

readDirRecursive(startDir);
 