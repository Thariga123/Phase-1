import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_CATEGORIES = {
  images: ['.jpg', '.jpeg', '.png', '.gif'],
  documents: ['.pdf', '.doc', '.docx', '.txt'],
  videos: ['.mp4', '.mov', '.avi'],
  music: ['.mp3', '.wav'],
};

function getCategory(extension) {
  for (const [category, extensions] of Object.entries(FILE_CATEGORIES)) {
    if (extensions.includes(extension)) return category;
  }
  return 'others';
}

function organizeFiles(directory) {
  if (!fs.existsSync(directory)) {
    console.log('❌ Directory does not exist.');
    return;
  }

  const files = fs.readdirSync(directory);
  const report = [];

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.lstatSync(filePath).isFile()) {
      const ext = path.extname(file).toLowerCase();
      const category = getCategory(ext);
      const categoryDir = path.join(directory, category);

      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir);
      }

      const destPath = path.join(categoryDir, file);
      fs.renameSync(filePath, destPath);
      report.push(`📂 Moved: ${file} → ${category}/`);
    }
  });

  console.log('\n✅ File Organization Completed!\n');
  if (report.length > 0) {
    report.forEach(line => console.log(line));
  } else {
    console.log('📂 No files to organize.');
  }
}


const targetDir = process.argv[2] || __dirname;
organizeFiles(targetDir);
