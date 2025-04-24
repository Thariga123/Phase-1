const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); 
const iv = crypto.randomBytes(16);  

const inputFile = 'sensitive.txt';
const encryptedFile = 'encrypted.enc';
const decryptedFile = 'decrypted.txt';

function encryptFile() {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const input = fs.createReadStream(inputFile);
  const output = fs.createWriteStream(encryptedFile);

  input.pipe(cipher).pipe(output);

  output.on('finish', () => {
    console.log('🔐 File encrypted successfully!');
    decryptFile(); 
  });

  output.on('error', (err) => {
    console.error(`❌ Encryption failed: ${err.message}`);
  });
}

function decryptFile() {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const input = fs.createReadStream(encryptedFile);
  const output = fs.createWriteStream(decryptedFile);

  input.pipe(decipher).pipe(output);

  output.on('finish', () => {
    console.log('🔓 File decrypted successfully!');

    
    const original = fs.readFileSync(inputFile, 'utf8');
    const decrypted = fs.readFileSync(decryptedFile, 'utf8');

    if (original === decrypted) {
      console.log('✅ Decrypted content matches original content.');
    } else {
      console.warn('⚠️ Decrypted content does NOT match original content.');
    }
  });

  output.on('error', (err) => {
    console.error(`❌ Decryption failed: ${err.message}`);
  });
}

if (!fs.existsSync(inputFile)) {
  fs.writeFileSync(inputFile, 'This is some sensitive information.');
  console.log(`📄 Test file "${inputFile}" created.`);
}

encryptFile(); 
