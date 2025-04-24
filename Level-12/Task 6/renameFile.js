const fs = require('fs');

const oldPath = 'original.txt';
const newPath = 'renamed.txt';

fs.rename(oldPath, newPath, (err) => {
  if (err) {
    console.error(`Error renaming file: ${err.message}`);
    return;
  }
  console.log(`File renamed from '${oldPath}' to '${newPath}' successfully!`);
});
