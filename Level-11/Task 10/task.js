let firstName = "Thariga";
let lastName = "Ravi";
let age = 19;

let fullNameSentence = `My name is ${firstName} ${lastName} and I am ${age} years old.`;

let multilineSentence = `
My name is ${firstName} ${lastName}.
I am ${age} years old.
Next year, I will be ${age + 1} years old.
`;

let ageMessage = age >= 18 ? `You are an adult.` : `You are a minor.`;

console.log(fullNameSentence);
console.log(multilineSentence);
console.log(ageMessage);
