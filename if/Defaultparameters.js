const greet = (name = "Guest") => `Hello, ${name}!`;

console.log(greet()); // Output: Hello, Guest!
console.log(greet("Alice")); // Output: Hello, Alice!