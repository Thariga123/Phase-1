const fs = require('fs');

const content = 'Hello, Node.js!';
const filePath = 'output.txt';

fs.writeFile(filePath, content, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
    return;
  }
  console.log(`File '${filePath}' has been written successfully!`);
});
