const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const originalFile = path.join(__dirname, 'original.txt');
const compressedFile = path.join(__dirname, 'original.txt.gz');
const decompressedFile = path.join(__dirname, 'decompressed.txt');

function createTestFile() {
  const content = 'This is a test file for compression and decompression.\n'.repeat(100);
  fs.writeFileSync(originalFile, content, 'utf8');
  console.log('✅ Created test file: original.txt');
}

function compressFile() {
  return new Promise((resolve, reject) => {
    const input = fs.createReadStream(originalFile);
    const output = fs.createWriteStream(compressedFile);
    const gzip = zlib.createGzip();

    input.pipe(gzip).pipe(output)
      .on('finish', () => {
        console.log('✅ File compressed to: original.txt.gz');
        resolve();
      })
      .on('error', err => {
        reject(new Error(`Compression failed: ${err.message}`));
      });
  });
}

function decompressFile() {
  return new Promise((resolve, reject) => {
    const input = fs.createReadStream(compressedFile);
    const output = fs.createWriteStream(decompressedFile);
    const gunzip = zlib.createGunzip();

    input.pipe(gunzip).pipe(output)
      .on('finish', () => {
        console.log('✅ File decompressed to: decompressed.txt');
        resolve();
      })
      .on('error', err => {
        reject(new Error(`Decompression failed: ${err.message}`));
      });
  });
}

function verifyMatch() {
  const original = fs.readFileSync(originalFile, 'utf8');
  const decompressed = fs.readFileSync(decompressedFile, 'utf8');

  if (original === decompressed) {
    console.log('✅ Verification successful: decompressed content matches original!');
  } else {
    console.error('❌ Verification failed: decompressed content does NOT match original!');
  }
}

async function run() {
  try {
    createTestFile();
    await compressFile();
    await decompressFile();
    verifyMatch();
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

run();
