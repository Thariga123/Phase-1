let favoriteFoods = ["Pizza", "Burger", "Pasta", "Sushi", "Ice Cream"];

let originalFoods = [...favoriteFoods];

favoriteFoods.push("Tacos");

favoriteFoods.shift();

let slicedFoods = favoriteFoods.slice(1, 4);

console.log("Original Array: [" + originalFoods.join(", ") + "]");
console.log("Modified Array: [" + favoriteFoods.join(", ") + "]");
console.log("Sliced Array: [" + slicedFoods.join(", ") + "]");
