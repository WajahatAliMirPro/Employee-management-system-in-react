import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const { data } = await api.get('/employees');
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await api.delete(`/employees/${id}`);
                fetchEmployees();
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-secondary-50">
            <Navbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 animate-fade-in">
                <div className="px-4 sm:px-0 mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-secondary-900">Employees</h1>
                        <p className="mt-1 text-sm text-secondary-500">A list of all the employees in your account including their name, title, email and role.</p>
                    </div>
                    <Link
                        to="/add-employee"
                        className="btn-primary flex items-center"
                    >
                        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Employee
                    </Link>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-secondary-200">
                    {isLoading ? (
                        <div className="p-8 text-center text-secondary-500">Loading employees...</div>
                    ) : employees.length === 0 ? (
                        <div className="p-8 text-center text-secondary-500">No employees found. Start by adding one.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-secondary-200">
                                <thead className="bg-secondary-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                                            Employee
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-secondary-200">
                                    {employees.map((employee) => (
                                        <tr key={employee._id} className="hover:bg-secondary-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        {employee.image ? (
                                                            <img className="h-10 w-10 rounded-full object-cover" src={employee.image} alt="" />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                                                {employee.name.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-secondary-900">{employee.name}</div>
                                                        <div className="text-sm text-secondary-500">{employee.gender}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-secondary-900">{employee.email}</div>
                                                <div className="text-sm text-secondary-500">{employee.mobile}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-secondary-900">{employee.designation}</div>
                                                <div className="text-sm text-secondary-500">{employee.course}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                                                {new Date(employee.createDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link to={`/edit-employee/${employee._id}`} className="text-primary-600 hover:text-primary-900 mr-4">
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(employee._id)} className="text-red-600 hover:text-red-900">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EmployeeList;
