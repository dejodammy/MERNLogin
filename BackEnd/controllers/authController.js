const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const Organisation = require('../models/Organisation'); 
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;
    const errors = [];

    if (!firstName) errors.push({ field: 'firstName', message: 'First name is required' });
    if (!lastName) errors.push({ field: 'lastName', message: 'Last name is required' });
    if (!email) errors.push({ field: 'email', message: 'Email is required' });
    if (!password) errors.push({ field: 'password', message: 'Password is required' }); 

    if (errors.length > 0) {return res.status(422).json({ errors });}

    try {
        let userCreated = await User.findOne({ email });
        if (userCreated) {
            return res.status(400).json({ status: "Bad Request", message: "User already exists", statusCode: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user instance
        const user = new User({
            userId: uuidv4(),
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone
        });

        // Save the user to the database
        await user.save();

        // Create an organization for the user
        const orgName = `${firstName}'s Organisation`;
        const organisation = new Organisation({
            orgId: uuidv4(),
            name: orgName
        });
        await organisation.save();

        // Define the payload using the newly created user
        const payload = {
            userId: user.userId,  // Use user.userId here
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        return res.status(201).json({ status: "success", message: "Registration Successful", data: { accessToken: accessToken, payload } });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Cannot find user');
        }
    
        // Compare passwords
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const payload = {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            };
    
            res.status(200).json({ status: 'success', message: `Congratulations, welcome ${user.firstName}`, data: { accessToken, user: payload } });
        } else {
            return res.status(401).json({ status: "Bad request", message: "Authentication failed", statusCode: 401 });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    registerUser,
    loginUser
};
