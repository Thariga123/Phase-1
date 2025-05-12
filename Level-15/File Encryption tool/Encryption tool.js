import crypto from 'crypto';
import fs from 'fs';
import path from'path';
import readline from'readline';

const DEFAULT_ALGO = 'aes-256-cbc';

function getKey(password, keyLength = 32) {
    return crypto.createHash('sha256').update(password).digest().slice(0, keyLength);
}
function encryptFile(filePath, password, algorithm = DEFAULT_ALGO) {
    const key = getKey(password, parseInt(algorithm.split('-')[1]) / 8);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(`${filePath}.enc`);

    input.pipe(cipher).pipe(output);

    output.on('finish', () => {
        fs.writeFileSync(`${filePath}.iv`, iv);
        console.log(`✅ File encrypted: ${filePath}.enc`);
    });
}
function decryptFile(filePath, password, algorithm = DEFAULT_ALGO) {
    const key = getKey(password, parseInt(algorithm.split('-')[1]) / 8);
    const ivPath = filePath.replace(/\.enc$/, '.iv');
    if (!fs.existsSync(ivPath)) {
        console.error('❌ IV file not found!');
        return;
    }
    const iv = fs.readFileSync(ivPath);

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(filePath.replace(/\.enc$/, '.dec'));

    input.pipe(decipher).pipe(output);

    output.on('finish', () => {
        console.log(`✅ File decrypted: ${filePath.replace(/\.enc$/, '.dec')}`);
    });
}
function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });
    return arrayOfFiles;
}
function encryptDirectory(dirPath, password, algorithm = DEFAULT_ALGO) {
    const files = getAllFiles(dirPath);
    files.forEach(file => encryptFile(file, password, algorithm));
}
function decryptDirectory(dirPath, password, algorithm = DEFAULT_ALGO) {
    const files = getAllFiles(dirPath).filter(f => f.endsWith('.enc'));
    files.forEach(file => decryptFile(file, password, algorithm));
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    console.log(`\n🔐 File Encryption Tool\n`);
    const mode = await ask('Choose mode (encrypt / decrypt): ');
    const targetPath = await ask('Enter file or directory path: ');
    const password = await ask('Enter password: ');
    const algorithm = await ask(`Enter algorithm [default: ${DEFAULT_ALGO}]: `) || DEFAULT_ALGO;

    if (!fs.existsSync(targetPath)) {
        console.error('❌ Path does not exist.');
        rl.close();
        return;
    }

    const isDirectory = fs.lstatSync(targetPath).isDirectory();

    try {
        if (mode === 'encrypt') {
            isDirectory ? encryptDirectory(targetPath, password, algorithm) :
                          encryptFile(targetPath, password, algorithm);
        } else if (mode === 'decrypt') {
            isDirectory ? decryptDirectory(targetPath, password, algorithm) :
                          decryptFile(targetPath, password, algorithm);
        } else {
            console.error('❌ Invalid mode selected.');
        }
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        rl.close();
    }
}

main();
