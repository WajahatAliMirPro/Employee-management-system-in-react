import Employee from '../models/Employee.js';

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private
export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Private
export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new employee
// @route   POST /api/employees
// @access  Private
export const createEmployee = async (req, res) => {
    const { name, email, mobile, designation, gender, course, image } = req.body;

    try {
        const employeeExists = await Employee.findOne({ email });

        if (employeeExists) {
            return res.status(400).json({ message: 'Employee already exists' });
        }

        const employee = await Employee.create({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            image,
        });

        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update an employee
// @route   PUT /api/employees/:id
// @access  Private
export const updateEmployee = async (req, res) => {
    const { name, email, mobile, designation, gender, course, image } = req.body;

    try {
        const employee = await Employee.findById(req.params.id);

        if (employee) {
            employee.name = name || employee.name;
            employee.email = email || employee.email;
            employee.mobile = mobile || employee.mobile;
            employee.designation = designation || employee.designation;
            employee.gender = gender || employee.gender;
            employee.course = course || employee.course;
            employee.image = image || employee.image;

            const updatedEmployee = await employee.save();
            res.json(updatedEmployee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an employee
// @route   DELETE /api/employees/:id
// @access  Private
export const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (employee) {
            await employee.deleteOne();
            res.json({ message: 'Employee removed' });
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
