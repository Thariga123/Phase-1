const fs = require('fs');
const path = require('path');

const monitoredDir = path.join(__dirname, 'monitored');
const logFile = path.join(__dirname, 'log.txt');

function logChange(message) {
  const timeStamp = new Date().toLocaleString();
  const logEntry = `[${timeStamp}] ${message}\n`;

  console.log(logEntry.trim());

  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error('❌ Error writing to log file:', err.message);
  });
}

function watchDirRecursive(dir) {
  try {
    fs.watch(dir, { recursive: true }, (eventType, filename) => {
      if (filename) {
        const fullPath = path.join(dir, filename);
        logChange(`${eventType.toUpperCase()}: ${fullPath}`);
      } else {
        logChange(`⚠️ Event triggered but filename was not provided`);
      }
    });

    logChange(`📡 Watching directory: ${dir}`);
  } catch (err) {
    console.error(`❌ Failed to watch directory: ${err.message}`);
  }
}

if (!fs.existsSync(monitoredDir)) {
  console.log(`🔧 Creating monitored directory: ${monitoredDir}`);
  fs.mkdirSync(monitoredDir, { recursive: true });
}

watchDirRecursive(monitoredDir);
