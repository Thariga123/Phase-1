const fs = require('fs');
const path = require('path');

const sourceFile = 'source.txt';
const destinationFile = 'destination.txt';

fs.access(destinationFile, fs.constants.F_OK, (err) => {
  if (!err) {
    console.log(`Destination file '${destinationFile}' already exists.`);
    return;
  }

  fs.copyFile(sourceFile, destinationFile, (err) => {
    if (err) {
      console.error(`Error copying file: ${err.message}`);
      return;
    }
    console.log(`File '${sourceFile}' copied successfully to '${destinationFile}'!`);
  });
});
