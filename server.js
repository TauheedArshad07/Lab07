
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_FILE = "students.json";
let students = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

app.get("/students", (req, res) => {
    res.status(200).json(students);
});

app.get("/students/department/:department", (req, res) => {
    const department = req.params.department.toLowerCase();

    const result = students.filter(
        item => item.department.toLowerCase() === department
    );

    res.status(200).json(result);
});

app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(item => item.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
});

app.post("/students", (req, res) => {
    const { name, department } = req.body;

    if (typeof name !== "string" || !name.trim() ||
        typeof department !== "string" || !department.trim()) {
        return res.status(400).json({
            message: "Name and department are required"
        });
    }

    const newId = students.length
        ? Math.max(...students.map(item => item.id)) + 1
        : 1;

    const newStudent = {
        id: newId,
        name: name.trim(),
        department: department.trim()
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(item => item.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, department } = req.body;

    if (typeof name !== "string" || !name.trim() ||
        typeof department !== "string" || !department.trim()) {
        return res.status(400).json({
            message: "Name and department are required"
        });
    }

    student.name = name.trim();
    student.department = department.trim();

    res.status(200).json(student);
});

app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = students.splice(index, 1)[0];

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
