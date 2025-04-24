const fs = require('fs');
const path = './data.json'; 
const sampleData = [
  { "id": 1, "name": "Alice", "age": 30 },
  { "id": 2, "name": "Bob", "age": 25 },
  { "id": 3, "name": "Charlie", "age": 35 }
];


fs.writeFile(path, JSON.stringify(sampleData, null, 2), (err) => {
  if (err) {
    console.error(`❌ Error writing to file: ${err.message}`);
    return;
  }
  console.log(`✅ Initial data written to ${path}`);
});


function modifyJsonFile() {
 
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`❌ Error reading file: ${err.message}`);
      return;
    }

  
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      console.error(`❌ Error parsing JSON data: ${parseErr.message}`);
      return;
    }

    jsonData.push({ "id": 4, "name": "David", "age": 28 });
    console.log("✅ Added new item: { id: 4, name: 'David', age: 28 }");

    
    const alice = jsonData.find(person => person.name === "Alice");
    if (alice) {
      alice.age = 31;
      console.log("✅ Updated Alice's age to 31");
    }

    const indexToRemove = jsonData.findIndex(person => person.name === "Bob");
    if (indexToRemove !== -1) {
      jsonData.splice(indexToRemove, 1);
      console.log("✅ Removed Bob from the list");
    }

    
    fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error(`❌ Error writing modified data to file: ${err.message}`);
        return;
      }
      console.log(`✅ Data successfully modified and written to ${path}`);
    });
  });
}
modifyJsonFile();
