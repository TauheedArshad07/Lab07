
const fs = require("fs");

const data = fs.readFileSync("employees.json", "utf8");
const employees = JSON.parse(data);

console.log("Current Employees:");
console.log(employees);

employees.push({
    id: 6,
    name: "Hassan",
    department: "IT"
});

fs.writeFileSync(
    "employees.json",
    JSON.stringify(employees, null, 2),
    "utf8"
);

console.log("Employee added successfully.");
console.log(employees);
