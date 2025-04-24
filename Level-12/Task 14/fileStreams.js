const fs = require('fs');
const path = require('path');

const sourceFile = 'largeFile.txt'; 
const destinationFile = 'largeFileCopy.txt';

fs.stat(sourceFile, (err, stats) => {
  if (err) {
    console.error(`❌ Error getting file stats: ${err.message}`);
    return;
  }

  const totalSize = stats.size;
  let bytesCopied = 0;


  const readStream = fs.createReadStream(sourceFile);
  const writeStream = fs.createWriteStream(destinationFile);

  readStream.on('data', (chunk) => {
    bytesCopied += chunk.length;
    const progress = (bytesCopied / totalSize) * 100;
    process.stdout.write(`Copying: ${Math.round(progress)}% complete\r`);
  });

  readStream.on('error', (err) => {
    console.error(`❌ Error reading file: ${err.message}`);
  });

  writeStream.on('error', (err) => {
    console.error(`❌ Error writing file: ${err.message}`);
  });

 
  writeStream.on('finish', () => {
    console.log(`\n✅ File copied successfully to '${destinationFile}'!`);
  });

  readStream.pipe(writeStream);
});
