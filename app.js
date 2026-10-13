
const calculator = require("./calculator");

console.log("Addition:", calculator.add(10, 5));
console.log("Subtraction:", calculator.subtract(10, 5));
console.log("Multiplication:", calculator.multiply(10, 5));
console.log("Division:", calculator.divide(10, 5));

try {
    console.log(calculator.divide(10, 0));
} catch (error) {
    console.log(error.message);
}
