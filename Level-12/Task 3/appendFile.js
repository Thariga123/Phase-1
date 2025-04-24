const fs = require('fs');

const contentToAppend = '\nMore content here.';
const filePath = 'output.txt';

fs.appendFile(filePath, contentToAppend, (err) => {
  if (err) {
    console.error('Error appending to file:', err);
    return;
  }
  console.log(`Content was appended to '${filePath}' successfully!`);
});
