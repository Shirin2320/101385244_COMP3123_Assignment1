const Employee = require('../models/employeeModel');

// Get All Employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: "Error fetching employees.", error: err.message });
    }
};

// Create New Employee
exports.createEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully.", employee_id: newEmployee._id });
    } catch (err) {
        res.status(500).json({ message: "Error creating employee.", error: err.message });
    }
};

// Get Employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) return res.status(404).json({ message: "Employee not found." });
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ message: "Error fetching employee.", error: err.message });
    }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        res.status(200).json({ message: "Employee details updated successfully." });
    } catch (err) {
        res.status(500).json({ message: "Error updating employee.", error: err.message });
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.query.eid);
        res.status(204).json({ message: "Employee deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: "Error deleting employee.", error: err.message });
    }
};
