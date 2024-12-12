const express = require('express');
const router = express.Router();
const { Books, Authors, Publishers } = require('../models');

// GET request for 'localhost:3001/'
router.get('/', async (req, res) => {
    try {
        const listOfAllBooks = await Books.findAll({
            // Include associated Authors and Publishers models
            include: [
                {
                    model: Authors,
                    attributes: ['authorName'] // Only fetch the author's name
                },
                {
                    model: Publishers,
                    attributes: ['publisherName'] // Only fetch the publisher's name
                }
            ]
        });

        //res.json(listOfAllBooks);


        // Transform the results to create a clean, readable response
        const transformedBooks = listOfAllBooks.map(book => ({
            bookID: book.bookID,
            bookTitle: book.bookTitle,
            authorName: book.Author ? book.Author.authorName : null, // Safely access author name
            bookGenre: book.bookGenre,
            bookPrice: book.bookPrice,
            stock: book.stock,
            publisherName: book.Publisher ? book.Publisher.publisherName : null, // Safely access publisher name
            rating: book.rating,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt
        }));

        // Send the transformed data as JSON response
        res.json(transformedBooks);
    } catch (error) {
        // Error handling
        console.error('Error fetching books:', error);
        res.status(500).json({ 
            error: "An error occurred while retrieving books", 
            details: error.message 
        });
    }
});

module.exports = router;