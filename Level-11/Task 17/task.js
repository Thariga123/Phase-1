let array1 = [1, 2, 3];
let array2 = [4, 5, 6];

let combinedArray = [...array1, ...array2];

let object1 = { name: "Thariga", age: 20 };
let object2 = { city: "Switzerland", occupation: " FullStackEngineer" };

let combinedObject = { ...object1, ...object2 };

let arrayCopy = [...array1];
arrayCopy.push(7);

console.log("Combined Array: " + combinedArray);
console.log("Combined Object: ", combinedObject);
console.log("Original Array: " + array1);
console.log("Modified Array Copy: " + arrayCopy);
