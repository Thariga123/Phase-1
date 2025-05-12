import fs from 'fs/promises';
import path from 'path';
import inquirer from 'inquirer';
import { marked } from 'marked';

const NOTES_DIR = path.join(process.cwd(), 'notes');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    console.error("❌ Failed to create directory:", err.message);
  }
}

async function createNote() {
  const { category, title, content } = await inquirer.prompt([
    { name: 'category', message: 'Enter category/folder:' },
    { name: 'title', message: 'Enter note title:' },
    { name: 'content', message: 'Enter note content (Markdown):' }
  ]);

  const categoryPath = path.join(NOTES_DIR, category);
  await ensureDir(categoryPath);
  const filePath = path.join(categoryPath, `${title}.md`);
  await fs.writeFile(filePath, content);
  console.log(`✅ Note "${title}" created in "${category}"`);
}

async function listNotes() {
  const categories = await fs.readdir(NOTES_DIR);
  for (const category of categories) {
    const catPath = path.join(NOTES_DIR, category);
    const files = await fs.readdir(catPath);
    console.log(`📁 ${category}:`);
    files.forEach(file => console.log(`  - ${file}`));
  }
}

async function viewNote() {
  const { category, title } = await inquirer.prompt([
    { name: 'category', message: 'Enter category:' },
    { name: 'title', message: 'Enter note title:' }
  ]);

  const filePath = path.join(NOTES_DIR, category, `${title}.md`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    console.log(`\n📝 ${title} (Markdown rendered):\n`);
    console.log(marked.parse(content));
  } catch {
    console.error('❌ Note not found.');
  }
}

async function editNote() {
  const { category, title } = await inquirer.prompt([
    { name: 'category', message: 'Enter category:' },
    { name: 'title', message: 'Enter note title:' }
  ]);
  const filePath = path.join(NOTES_DIR, category, `${title}.md`);
  try {
    const oldContent = await fs.readFile(filePath, 'utf-8');
    const { newContent } = await inquirer.prompt([
      { name: 'newContent', message: 'Edit note:', default: oldContent }
    ]);
    await fs.writeFile(filePath, newContent);
    console.log('✅ Note updated.');
  } catch {
    console.error('❌ Could not edit note.');
  }
}

async function deleteNote() {
  const { category, title } = await inquirer.prompt([
    { name: 'category', message: 'Enter category:' },
    { name: 'title', message: 'Enter note title:' }
  ]);
  const filePath = path.join(NOTES_DIR, category, `${title}.md`);
  try {
    await fs.unlink(filePath);
    console.log('🗑️ Note deleted.');
  } catch {
    console.error('❌ Could not delete note.');
  }
}

async function searchNotes() {
  const { keyword } = await inquirer.prompt([
    { name: 'keyword', message: 'Enter keyword to search in notes:' }
  ]);

  const categories = await fs.readdir(NOTES_DIR);
  for (const category of categories) {
    const catPath = path.join(NOTES_DIR, category);
    const files = await fs.readdir(catPath);
    for (const file of files) {
      const filePath = path.join(catPath, file);
      const content = await fs.readFile(filePath, 'utf-8');
      if (content.toLowerCase().includes(keyword.toLowerCase())) {
        console.log(`🔍 Found in ${category}/${file}`);
      }
    }
  }
}

async function main() {
  await ensureDir(NOTES_DIR);

  while (true) {
    const { action } = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'Choose an action:',
      choices: [
        'Create Note',
        'List Notes',
        'View Note',
        'Edit Note',
        'Delete Note',
        'Search Notes',
        'Exit'
      ]
    }]);

    if (action === 'Create Note') await createNote();
    else if (action === 'List Notes') await listNotes();
    else if (action === 'View Note') await viewNote();
    else if (action === 'Edit Note') await editNote();
    else if (action === 'Delete Note') await deleteNote();
    else if (action === 'Search Notes') await searchNotes();
    else break;
  }
}

main().catch(console.error);
