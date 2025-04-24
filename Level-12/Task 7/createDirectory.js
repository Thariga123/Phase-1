const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'new_folder');

if (fs.existsSync(dirPath)) {
  console.log(`Directory '${dirPath}' already exists.`);
} else {
  fs.mkdir(dirPath, (err) => {
    if (err) {
      console.error(`Error creating directory: ${err.message}`);
      return;
    }
    console.log(`Directory '${dirPath}' created successfully!`);
  });
}
