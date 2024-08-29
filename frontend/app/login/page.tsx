'use client';
import React, { useState } from 'react';

const INITIAL_STATE = {
    email: '',
    password: '',
};

interface FormValues {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>(INITIAL_STATE);
    const [errors, setErrors] = useState<string[]>([]);

    const validateForm = (): string[] => {
        const error: string[] = [];
        if (!formValues.email) error.push("Email is required");
        if (!formValues.password) error.push("Password is required");
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
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-[400px] p-8 bg-[#02020E] shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-[#FFFFFF] mb-4">Login to Chams</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#6E6E78]">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={formValues.email}
                            onChange={handleChange}
                            className="w-full border-b-2 text-[#6E6E78] border-gray-400 focus:border-[#6C7A99] bg-transparent pl-0 py-1 outline-none"
                            placeholder="example@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[#6E6E78]">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={formValues.password}
                            onChange={handleChange}
                            className="w-full border-b-2 text-[#6E6E78] border-gray-400 focus:border-[#6C7A99] bg-transparent pl-0 py-1 outline-none"
                            placeholder="********"
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
                            className="mr-2"
                        />
                        <label htmlFor="remember-me" className="text-sm text-[#6E6E78]">Remember Me</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-[#1A1B26] text-[#F3C280] font-semibold rounded-lg shadow-md hover:bg-[#2A2B36] focus:outline-none focus:ring-2 focus:ring-[#4A4B66]"
                    >
                        Login
                    </button>
                    <div className="text-center text-sm text-[#6E6E78] mt-4">
                        <a href="/forgot-password" className="text-[#F3C280] hover:underline">Forgot Password?</a>
                    </div>
                    <div className="text-center text-sm text-[#6E6E78] mt-2">
                        <p>
                            Don't have an account? 
                            <a href="/register" className="text-[#F3C280] hover:underline"> Register</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
