function createCounter() {
    let count = 0;
    return function() {
      count++;
      return count;
    };
  }
  
  let counter1 = createCounter();
  let counter2 = createCounter();
  
  console.log(counter1()); 
  console.log(counter1()); 
  console.log(counter1()); 
  
  console.log(counter2()); 
  console.log(counter2()); 
  console.log(counter2()); 
  