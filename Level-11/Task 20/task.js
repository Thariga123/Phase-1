function operateOnArray(array, operation) {
    return array.map(operation);
  }
  
  function double(num) {
    return num * 2;
  }
  
  function square(num) {
    return num * num;
  }
  
  function toString(num) {
    return num.toString();
  }
  
  let numbers = [1, 2, 3, 4, 5];
  
  console.log("Doubled Numbers: ", operateOnArray(numbers, double));
  console.log("Squared Numbers: ", operateOnArray(numbers, square));
  console.log("Numbers as Strings: ", operateOnArray(numbers, toString));
  