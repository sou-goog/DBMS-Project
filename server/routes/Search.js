const express = require('express');
const router = express.Router();
const {Books, Authors} = require('../models');
const { Op } = require('sequelize');


// Search By BookTitle
router.post('/bybooktitle', async (req, res) => {
    const { query } = req.body;

    try {
        const resultantBooks = await Books.findAll({
            include: [{model: Authors, attirbutes: ['authorName']}],
            where: {
                bookTitle: {[Op.like]: `%${query}%`}
            }
        })

        
        res.json(resultantBooks.map(book => ({
            bookID: book.bookID,
            bookTitle: book.bookTitle,
            bookGenre: book.bookGenre,
            bookPrice: book.bookPrice,
            rating: book.rating,
            authorName: book.Author.authorName
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Failed to search books by bookTitle.'})
    }
});


// Search By authorName
router.post('/byauthorName', async (req, res) => {
    const { query } = req.body;

    try {
        const resultantBooks = await Books.findAll({
            include: [{
                model: Authors,
                attirbutes: ['authorName'],
                where: {
                authorName: {[Op.like]: `%${query}%`}
                }
            }]
        });

        
        res.json(resultantBooks.map(book => ({
            bookID: book.bookID,
            bookTitle: book.bookTitle,
            bookGenre: book.bookGenre,
            bookPrice: book.bookPrice,
            rating: book.rating,
            authorName: book.Author.authorName
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Failed to search books by bookTitle.'})
    }
});


module.exports = router;