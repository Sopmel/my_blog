const Post = require('../models/post.model');

let blurredWords = [];

const getBlurredWord = (req, res) => {
    res.status(200).json(blurredWords);
    console.log(blurredWords)
};

const addBlurredWord = (req, res) => {
    const { word } = req.body;
    if (!word) {
        return res.status(400).json({ message: 'Word is required' });
    }
    // Add the word to the list of blurred words
    blurredWords.push(word);
    res.status(200).json({ message: 'Word added to blurred words' });
};

const deleteBlurredWord = (req, res) => {
    const { word } = req.body;
    if (!word) {
        return res.status(400).json({ message: 'Word is required' });
    }
    // Find and remove the word from the list of blurred words
    blurredWords = blurredWords.filter(blurredWord => blurredWord !== word);
    res.status(200).json({ message: 'Word removed from blurred words' });
};

module.exports = {
    getBlurredWord,
    addBlurredWord,
    deleteBlurredWord
};