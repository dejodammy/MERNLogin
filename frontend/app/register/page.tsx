'use client';
import React, { useState } from 'react';

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (formErrors.length > 0) {
            setErrors(formErrors);
        } else {
            setErrors([]);
            // Handle successful form submission
            console.log("Form submitted successfully with values:", formValues);
        }
    };

    return (
        <div className="flex items-center justify-start min-h-screen bg-white">
            <div className="w-[640px] h-screen pl-[60px] pt-[76px] pr-[135px] bg-[#02020E] shadow-md">
                <h1 className="text-2xl w-[338px] font-bold text-[#FFFFFF] mb-[0px]">Welcome To Chams</h1>
                <p className='text-[#F3C280] text-sm mb-[36px]'>Create your account</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className='flex'>
                        <div className='w-[202px] mb-2'>
                            <label htmlFor="firstName" className="block text-sm font-medium text-[#6E6E78]">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                value={formValues.firstName}
                                onChange={handleChange}
                                className="w-[190px] ml-0 border-b-2 text-[#6E6E78] border-[#9E9EAC] focus:border-[#6C7A99] bg-transparent pl-0 py-1 outline-none"
                                placeholder="John"
                            />
                        </div>
                        <div className='w-[202px]'>
                            <label htmlFor="lastName" className="block text-sm font-medium text-[#6E6E78]">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                value={formValues.lastName}
                                onChange={handleChange}
                                className="border-b-2 text-[#6E6E78] border-gray-400 focus:border-[#6C7A99] bg-transparent pl-0 py-1 outline-none"
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
                            className="w-[415px] border-b-2 text-[#6E6E78] border-gray-400 font-semibold text-[12px] focus:border-[#6C7A99] bg-transparent pl-0 py-1 outline-none"
                            placeholder="Example@.com"
                        />
                    </div>
                    <div className='flex'>
                        <div className='w-[202px] mt-2'>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={formValues.password}
                                onChange={handleChange}
                                className="w-[190px] border-b-2 text-[#6E6E78] border-gray-400 focus:border-[#6C7A99] bg-transparent pl-0 py-1 outline-none"
                                placeholder="********"
                            />
                        </div>
                        <div className='w-[202px] mb-2 mt-2'>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                                className="border-b-2 text-[#6E6E78] border-gray-400 focus:border-[#6C7A99] bg-transparent pl-0 py-1 outline-none"
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
                            className="w-[415px] border-b-2 text-[#6E6E78] border-gray-400 font-semibold text-[12px] focus:border-[#6C7A99] bg-transparent pl-0 py-1 outline-none"
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
                    <div className="flex items-center mb-4">
                        <input 
                            type="checkbox"
                            id="remember-me"
                            className="mr-2 bg-gray-100"
                        />
                        <label htmlFor="remember-me" className="text-sm text-[12px] text-[#6E6E78]">Remember Me</label>
                    </div>
                    <div className="text-sm text-[12px] text-[#6E6E78] mb-4">
                        <p>
                            By signing up, you agree to our 
                            <a href="/terms" className="text-[#F3C280] hover:underline"> Terms and Conditions</a>.
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="w-[415px] mt-1 px-4 py-2 bg-[#1A1B26] text-[#F3C280] font-semibold rounded-lg shadow-md hover:bg-[#2A2B36] focus:outline-none focus:ring-2 focus:ring-[#4A4B66]"
                    >
                        Register
                    </button>
                    <div className="text-center text-[12px] mr-8 mt-4">
                        <a href="/forgot-password" className="text-[#F3C280] hover:underline">Forgot Password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
