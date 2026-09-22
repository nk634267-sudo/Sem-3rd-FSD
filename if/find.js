const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);

const evens = numbers.filter(num => num % 2 === 0);

const sum = numbers.reduce((total, n) => total + n, 0);

console.log(doubled); // Output: [2, 4, 6, 8, 10]
console.log(evens);   
// Output: [2, 4]
console.log(sum);       
// Output: 15