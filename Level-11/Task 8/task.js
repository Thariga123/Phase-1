let person = {
    name: "Thariga",
    age: 30,
    city: "Namakkal",
    hobbies: ["Cooking", "Traveling", "Gardening"],
   
    greet: function() {
      return "Hello, my name is " + this.name + "!";
    }
  };
  
  console.log("Name: " + person.name);
  console.log("Age: " + person.age);
  console.log("City: " + person.city);
  console.log("Hobbies: " + person.hobbies.join(", "));
  

  person.job = "FullStack Developer";

  person.age = 31;
  
  console.log(person.greet());
 
  console.log("Updated Person Object: ", person);
  