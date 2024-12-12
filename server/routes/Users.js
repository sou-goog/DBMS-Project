const express = require('express');
const bcrypt = require('bcrypt');       // For password hashing
const router = express.Router();        // For routes*
const { Users } = require('../models');

/* USER ONBOARDING */

// for localhost:3001/users
router.get('/', async (req, res) => {
    const listOfAllUsers = await Users.findAll();
    res.json(listOfAllUsers);
});


/* USER SIGNUP */
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if a user with the same email already exists
        const existingUser = await Users.findOne({where: { email }});

        // If a user exists raise an error
        if (existingUser) {
            return res.status(400).json({
                error: "An account with the given email already exists."
            });       
        }

        // If no existing user, create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
             email: email,
             password: hashedPassword
            });

        res.status(201).json(newUser);
     } catch (error) {
        console.error("Error while creating user: ", error);
        res.status(500).json({
            error: "An error occured while creating the user."
        })
     }
    
})


module.exports = router;