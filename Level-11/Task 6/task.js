let sum =0;

for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
      console.log("Even number: " + i);
      sum += i;
    }
  }
  
  console.log("Sum of even numbers: " + sum);