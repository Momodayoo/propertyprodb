const { body } = require("express-validator");

const imageValidator = [
    body('propertyId', 'property ID is required').not().isEmpty(),
    body('propertyId', 'property ID must be an integer').isInt()
];

module.exports = {
    imageValidator
};