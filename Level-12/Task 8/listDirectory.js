const fs = require('fs');
const path = require('path');

const currentDir = __dirname;

fs.readdir(currentDir, (err, items) => {
  if (err) {
    console.error(`Error reading directory: ${err.message}`);
    return;
  }

  console.log(`Contents of: ${currentDir}\n`);

  items.forEach(item => {
    const itemPath = path.join(currentDir, item);
    try {
      const stats = fs.statSync(itemPath);
      if (stats.isDirectory()) {
        console.log(` [DIR]  ${item}`);
      } else {
        console.log(`[FILE] ${item}`);
      }
    } catch (err) {
      console.error(`Error accessing '${item}': ${err.message}`);
    }
  });
});
