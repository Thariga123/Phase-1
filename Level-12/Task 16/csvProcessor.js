const fs = require('fs');
const path = './data.csv'; 
const outputPath = './processedResults.txt'; 
function processCsvFile() {
 
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`❌ Error reading file: ${err.message}`);
      return;
    }

    const rows = data.split('\n').map(row => row.split(','));
    
    const headers = rows[0];
    const rowsData = rows.slice(1); 
   
    let sum = 0;
    let max = -Infinity;
    let min = Infinity;
    let count = 0;

    rowsData.forEach(row => {
      const value = parseFloat(row[1]); 
      if (!isNaN(value)) {
        sum += value;
        max = Math.max(max, value);
        min = Math.min(min, value);
        count++;
      }
    });

    const average = count > 0 ? sum / count : 0;


    const results = `
      Summary of CSV Data Analysis:
      -----------------------------
      Total Rows Processed: ${count}
      Average Value: ${average.toFixed(2)}
      Max Value: ${max}
      Min Value: ${min}
    `;

    fs.writeFile(outputPath, results, (err) => {
      if (err) {
        console.error(`❌ Error writing results to file: ${err.message}`);
        return;
      }
      console.log(`✅ Analysis complete. Results saved to ${outputPath}`);
    });
  });
}

processCsvFile();
