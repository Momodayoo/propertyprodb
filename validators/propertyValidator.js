const { body, param } = require("express-validator");

const propertyValidator = [
    body("userId", "User ID is required").not().isEmpty(),
    body("userId", "User ID has to be an integer").isNumeric(),
    body("type", "Property type is required").not().isEmpty(),
    body("type", "Invalid property type").matches(/^(landed|apartment|unit|studio)$/),
    body("address", "address is required").not().isEmpty(),
    body("price", "Price is required").not().isEmpty(),
    body("price", "Price must be an integer").isInt(),
    body("profile").optional().isLength({ min: 0 }),
];

// Adjustments for partial updates where not all fields are required
const updatePropertyValidator = [
    param("id", "Property ID is required").not().isEmpty(),
    param("id", "Property ID has to be an integer").isNumeric(),
    body("userId").optional().isNumeric().withMessage("User ID has to be an integer"),
    body("type").optional().matches(/^(landed|apartment|unit|studio)$/).withMessage("Invalid property type"),
    body("address", "address is required").not().isEmpty(),
    body("price", "Price is required").not().isEmpty(),
    body("price", "Price must be an integer").isInt(),
    body("profile").optional().isLength({ min: 0 }),
];

const propertyTypeParamValidator = [
    param("type", "Property type is required").not().isEmpty(),
    param("type", "Invalid property type").matches(/^(landed|apartment|unit|studio)$/)
];

module.exports = {
    propertyValidator,
    updatePropertyValidator,
    propertyTypeParamValidator,
};