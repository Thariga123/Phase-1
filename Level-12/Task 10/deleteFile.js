const fs = require('fs');
const path = require('path');

const filePath = 'testFile.txt';


fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`File '${filePath}' does not exist.`);
    return;
  }


  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err.message}`);
      return;
    }
    console.log(`File '${filePath}' deleted successfully!`);
  });
});
