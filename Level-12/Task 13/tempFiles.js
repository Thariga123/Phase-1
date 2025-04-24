const fs = require('fs');
const path = require('path');

const tempDirPrefix = path.join(__dirname, 'temp_');

fs.mkdtemp(tempDirPrefix, (err, tempDir) => {
  if (err) {
    console.error(`Error creating temporary directory: ${err.message}`);
    return;
  }

  console.log(`Temporary directory created: ${tempDir}`);

 
  const createTempFile = (fileName, data) => {
    const filePath = path.join(tempDir, fileName);
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        console.error(` Error writing to file '${filePath}': ${err.message}`);
        return;
      }
      console.log(`File created: ${filePath}`);
    });
  };

 
  createTempFile('file1.txt', 'This is the first temporary file.');
  createTempFile('file2.txt', 'This is the second temporary file.');
  createTempFile('file3.txt', 'This is the third temporary file.');
});
