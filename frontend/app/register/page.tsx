'use client';
import React, { useState } from 'react';
import axios from 'axios';

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    number: '',
};

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    number: string;
}

const RegisterPage: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>(INITIAL_STATE);
    const [errors, setErrors] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const validateForm = (): string[] => {
        const error: string[] = [];
        if (!formValues.firstName) error.push("First name is required");
        if (!formValues.lastName) error.push("Last name is required");
        if (!formValues.email) error.push("Email is required");
        if (!formValues.password) error.push("Password is required");
        if (formValues.password !== formValues.confirmPassword) error.push("Passwords do not match");
        if (!formValues.number) error.push("Phone number is required");
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (formErrors.length > 0) {
            setErrors(formErrors);
            setSuccessMessage('');
        } else {
            setErrors([]);
            try {
                const response = await axios.post('http://localhost:5000/auth/register', formValues);
                setSuccessMessage('Registration successful! Please check your email to confirm your account.');
            } catch (error: any) {
                if (error.response && error.response.data) {
                    setErrors(error.response.data.errors.map((err: any) => err.message));
                } else {
                    setErrors(['An error occurred. Please try again later.']);
                }
                setSuccessMessage('');
            }
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-white">
            <div className="flex-1 lg:w-1/2 p-6 lg:p-12 bg-[#02020E] shadow-md flex flex-col justify-center">
                <h1 className="text-2xl font-bold text-[#FFFFFF] mb-4">Welcome To Chams</h1>
                <p className='text-[#F3C280] text-sm mb-6'>Create your account</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col lg:flex-row lg:space-x-4">
                        <div className='flex-1 mb-2'>
                            <label htmlFor="firstName" className="block text-sm font-medium text-[#6E6E78]">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                value={formValues.firstName}
                                onChange={handleChange}
                                className="w-full border-b-2 text-[#6E6E78] border-[#9E9EAC] focus:border-[#6C7A99] bg-transparent pl-0 py-1 outline-none"
                                placeholder="John"
                            />
                        </div>
                        <div className='flex-1'>
                            <label htmlFor="lastName" className="block text-sm font-medium text-[#6E6E78]">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                value={formValues.lastName}
                                onChange={handleChange}
                                className="w-full border-b-2 text-[#6E6E78] border-gray-400 focus:border-[#6C7A99] bg-transparent pl-0 py-1 outline-none"
                                placeholder="Doe"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={formValues.email}
                            onChange={handleChange}
                            className="w-full border-b-2 text-[#6E6E78] border-gray-400 font-semibold text-[12px] focus:border-[#6C7A99] bg-transparent pl-0 py-1 outline-none"
                            placeholder="Example@.com"
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row lg:space-x-4">
                        <div className='flex-1 mt-2'>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={formValues.password}
                                onChange={handleChange}
                                className="w-full border-b-2 text-[#6E6E78] border-gray-400 focus:border-[#6C7A99] bg-transparent pl-0 py-1 outline-none"
                                placeholder="********"
                            />
                        </div>
                        <div className='flex-1 mt-2'>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                                className="w-full border-b-2 text-[#6E6E78] border-gray-400 focus:border-[#6C7A99] bg-transparent pl-0 py-1 outline-none"
                                placeholder="********"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            id="number"
                            value={formValues.number}
                            onChange={handleChange}
                            className="w-full border-b-2 text-[#6E6E78] border-gray-400 font-semibold text-[12px] focus:border-[#6C7A99] bg-transparent pl-0 py-1 outline-none"
                            placeholder="Phone Number"
                        />
                    </div>
                    {errors.length > 0 && (
                        <div className="mb-4 text-red-500 text-sm">
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-4 text-green-500 text-sm">
                            {successMessage}
                        </div>
                    )}
                    <div className="flex items-center mb-4">
                        <input 
                            type="checkbox"
                            id="remember-me"
                            className="mr-2 bg-gray-100"
                        />
                        <label htmlFor="remember-me" className="text-sm text-[#6E6E78]">Remember Me</label>
                    </div>
                    <div className="text-sm text-[#6E6E78] mb-4">
                        <p>
                            By signing up, you agree to our 
                            <a href="/terms" className="text-[#F3C280] hover:underline"> Terms and Conditions</a>.
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-[#1A1B26] text-[#F3C280] font-semibold rounded-lg shadow-md hover:bg-[#2A2B36] focus:outline-none focus:ring-2 focus:ring-[#4A4B66]"
                    >
                        Register
                    </button>
                    <div className="text-center text-sm mt-4">
                        <a href="/forgot-password" className="text-[#F3C280] hover:underline">Forgot Password?</a>
                    </div>
                </form>
            </div>
            <div className="hidden lg:block lg:w-1/2">
                <div className='h-full w-full bg-[#1E1E1E]'>
                    <div className='h-full bg-opacity-10 bg-white'></div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
