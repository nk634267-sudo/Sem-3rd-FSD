const fs = require('fs');

fs.writeFileSync('student.txt', 'Hello, Niraj!');
console.log('File created successfully.');

const data = fs.readFileSync('student.txt', 'utf8');
console.log('File content:', data);

fs.appendFileSync('student.txt', '\nWelcome to Node.js!');
console.log('File updated successfully.');

const updatedData = fs.readFileSync('student.txt', 'utf8');
console.log('Updated content:', updatedData);

fs.unlinkSync('student.txt');
console.log('File deleted successfully.');