function factorial(n) {
    if (n < 0) {
      throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
      return 1;
    }
    return n * factorial(n - 1);
  }
  
  try {
    console.log("Factorial of 5: " + factorial(5)); 
    console.log("Factorial of 3: " + factorial(3)); 
    console.log("Factorial of 0: " + factorial(0)); 
    console.log("Factorial of 10: " + factorial(10)); 
    console.log("Factorial of -2: " + factorial(-2)); 
  } catch (error) {
    console.log("Error:", error.message);
  }
  