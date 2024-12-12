const express = require('express');
const router = express.Router();
const { Users } = require('../models');

/* USER ONBOARDING */

// GET req for 'localhost:3001/signup'
router.get('/', async (req, res) => {
    const listOfAllUsers = await Users.findAll();
    res.json(listOfAllUsers);
    //res.send("Signup page is still being constructed.");
});


// POST req that deals with the form and creates new users
router.post('/', async (req, res) => {
    // Extract data from the post request
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
        const newUser = await Users.create({ email, password });
        res.status(201).json(newUser);
     } catch (error) {
        console.error("Error while creating user: ", error);
        res.status(500).json({
            error: "An error occured while creating the user."
        })
     }
    
})


module.exports = router;