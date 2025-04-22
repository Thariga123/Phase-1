let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let squaredNumbers = numbers.map(num => num * num);

let oddNumbers = numbers.filter(num => num % 2 !== 0);

let sum = numbers.reduce((acc, num) => acc + num, 0);

numbers.forEach(num => {
  console.log(`Number: ${num}, Square Root: ${Math.sqrt(num)}`);
});

console.log("Squared Numbers: " + squaredNumbers);
console.log("Odd Numbers: " + oddNumbers);
console.log("Sum of All Numbers: " + sum);
