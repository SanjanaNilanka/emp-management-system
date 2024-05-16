const Employee = require('../models/employeeModel')
const authService = require('./authService')

const createEmployee = async (emp) => {
    try {
        const retreivedEmp = await Employee.findOne({ empID: emp.empID });
        if (!retreivedEmp) { 
            try {
                const returnedData = await authService.createUser(emp.email, emp.nic, "Employee");
                if (returnedData.success) {
                    const newEmployee = new Employee({
                        fullName: emp.fullName,
                        empID: emp.empID,
                        nic: emp.nic,
                        email: emp.email,
                        address: emp.address,
                        phone: emp.phone,
                        workExperience: emp.workExperience,
                        marriageStates: emp.marriageStates,
                        qualifications: emp.qualifications,
                        gender: emp.gender,
                        startDate: emp.startDate,
                        dob: emp.dob,
                        department: emp.department,
                        position: emp.position,
                        user: returnedData.user._id
                    })
                    try {
                        const createdEmploye = await newEmployee.save();
                        if (createdEmploye) {
                            const notification = {
                                title: "Welcome!",
                                description: `Welcome ${createdEmploye.fullName}! You were registered as an employee of KDU}`
                            }
                            setNotification(createdEmploye._id, notification);
                            return {success: true, message: "Employee is registered successfully.", employee: createdEmploye };
                        } else {
                            return {success: false, message: "Failed to create employee."};
                        }
                    } catch (error) {
                        console.error('Error saving employee:', error); // Log the error if save() fails
                        return {success: false, message: "Failed to create employee."};
                    }
                } else {
                    return { success: false, message: "Failed to create user." };
                }
                
            } catch (err) { 
                console.error('Error creating user:', err); // Log the error if createUser() fails
                return { success: false, message: "Failed to create user." };
            }
        } else {
            return { success: false, message: "Failed to create user. Employee is already existing under this employee id" };
        }
    } catch (err) {
        console.error('Error fetching employee:', err); // Log the error if findOne() fails
        return { success: false, message: "Failed to create user.: Error" + err.message };
    }
}


const getEmployees = async () => {
    try {
        const employees = await Employee.find();
        if (employees) {
            return { success: true, message: "Employees are retrieved successfully.", employees: employees };
        } else {
            return { success: false, message: "Failed to get employees." };
        }
    } catch (err) {
        return { success: false, message: "Failed to get employees." };
    }
}

const getEmployeeByID = async (id) => {
    try {
        const employee = await Employee.findById(id);
        if (employee) {
            return { success: true, message: "Employee is retrieved successfully.", employee: employee };
        } else {
            return { success: false, message: "Failed to get employee." };
        }
    } catch (err) {
        return { success: false, message: "Failed to get employee." };
    }
}

const findByUserID = async (userID) => {
    try {
        const employee = await Employee.findOne({ user: userID });
        if (employee) {
            return {success: true, message: "Employee is retrieved successfully.", employee: employee};
        } else {
            return {success: false, message: "Failed to retrieve employee."};
        }
    } catch (error) {
        return {success: false, message: "Failed to retrieve employee."};
    }
}

const updateEmployee = async (id, updatedData) => { 
    const updatedEmployee = {
        fullName: updatedData.fullName,
        empID: updatedData.empID,
        nic: updatedData.nic,
        email: updatedData.email,
        address: updatedData.address,
        phone: updatedData.phone,
        workExperience: updatedData.workExperience,
        marriageStates: updatedData.marriageStates,
        qualifications: updatedData.qualifications,
        gender: updatedData.gender,
        startDate: updatedData.startDate,
        dob: updatedData.dob,
        department: updatedData.department,
        user: returnedData.user._id
    }
    try {
        const updateEmployeeData = await Employee.findByIdAndUpdate(id, updatedEmployee, { new: true });
        if (updateEmployeeData) {
            return { success: true, message: "Employee is updated successfully.", employee: updateEmployeeData };
        } else {
            return { success: false, message: "Failed to update employee." };
        }
    } catch (err) {
        return { success: false, message: "Failed to update employee." };
    }
}

const deleteEmployee = async (id) => { 
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (deletedEmployee) {
            try {
                const deletedUser = await authService.userDeleteByID(deletedEmployee.user)
            } catch (err) { 
                console.error('Error deleting employee:', err); // Log the error if findOne() fails
                return { success: false, message: "Failed to delete employee." };
            }
            return { success: true, message: "Employee is deleted successfully." };
        } else {
            return { success: false, message: "Failed to delete employee." };
        }
    } catch (err) {
        return { success: false, message: "Failed to delete employee." };
    }
}

const getAllNotifications = async (id) => {
    try {
        const emp = await Employee.findById(id);
        const seenNotification = emp.seenNotification;
        const notification = emp.notification;
        seenNotification.push(...notification);
        emp.notification = []
        emp.seenNotification = notification;
        const updateEmp = await emp.save();
        if (updateEmp) {
            return { success: true, message: "All notification marked as read.", employee: updateEmp };
        } else {
            return { success: false, message: "Failed to update employee." };
        }
    } catch (err) {
        return { success: false, message: "Failed to get notifications." };
    }
}

const setNotification = async (id, notification) => { 
    try {
        const emp = await Employee.findById(id);
        console.log(emp);
        const notify = emp.notification;
        notify.push(notification);
        const updateEmp = await emp.save();
        if (updateEmp) {
            return { success: true, message: "Notification is sent." };
        } else {
            return { success: false, message: "Failed to update employee." };
        }
    } catch (error) {
        return { success: false, message: "Failed to set notifications: ", error: error.message };
    }
}

module.exports = {
    createEmployee,
    getEmployees,
    getEmployeeByID,
    findByUserID,
    updateEmployee,
    deleteEmployee,
    getAllNotifications,
    setNotification
};