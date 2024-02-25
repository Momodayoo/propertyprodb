const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");

// import multer for image file hanlding
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// import validators
const {validationResult} = require('express-validator');
const { idParamValidator, imageUploadValidator } = require("../validators");
const {propertyValidator, updatePropertyValidator, propertyTypeParamValidator} = require("../validators/propertyValidator");

/**
 * @swagger
 * /api/property:
 *  get:
 *    description: Use to request all property
 *    tags:
 *      - Properties
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: User not found
 *      '500':
 *        description: Server error
 */
router.get("/", async (req, res, next) => {
    try {
        const data = await propertyController.getAllProperty();
        res.send(data);
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/property/{id}:
 *  get:
 *    description: Use to request a property by ID
 *    tags:
 *      - Properties
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of property to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Property not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await propertyController.getProperty(req.params.id);
            if (!data) {
                res.sendStatus(404);
            } else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/property/user/{id}:
 *  get:
 *    description: Use to request a properties by user ID
 *    tags:
 *      - Properties
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to fetch properties 
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Property not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/user/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await propertyController.getPropertyByUser(req.params.id);
            if (!data) {
                res.sendStatus(404);
            } else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/property/type/{type}:
 *  get:
 *    description: Use to request property by type
 *    tags:
 *      - Properties
 *    parameters:
 *      - name: type
 *        in: path
 *        description: type of property
 *        required: true
 *        type: string
 *        example: landed
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Property not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.get("/type/:type", propertyTypeParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await propertyController.getPropertyByType(req.params.type);
            if (!data) {
                res.sendStatus(404);
            } else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/property:
 *  post:
 *    description: Use to create a new property
 *    tags:
 *      - Properties
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - userId
 *              - address
 *              - type
 *              - price
 *            properties:
 *              userId:
 *                type: integer
 *                example: 2
 *              address:
 *                type: string
 *                example: 20 woop woop allaway
 *                nullable: true
 *              type:
 *                type: string
 *                enum: [landed, apartment, unit, studio]
 *                example: landed
 *              price:
 *                type: integer
 *                example: 20,000
 *                nullable: true
 *              image:
 *                type: string
 *                format: binary
 *                description: Optional image file
 *                nullable: true
 *              profile:
 *                type: string
 *                example: This is my favorite house!
 *                nullable: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Invalid JSON
 *      '404':
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.post("/", upload.single('image'), imageUploadValidator, propertyValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            let propertyData = req.body;
            if (req.file){
                propertyData.image = req.file;
            }
            const data = await propertyController.createProperty(propetyData);
            if (!data){
                res.sendStatus(404);
            } else {
                res.send({result:200, data:data});
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/property/{id}:
 *  put:
 *    description: Use to update an existing property
 *    tags:
 *      - Properties
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - userId
 *              - address
 *              - type
 *              - price
 *            properties:
 *              userId:
 *                type: integer
 *                example: 2
 *              address:
 *                type: string
 *                example: 20 woop woop allaway
 *                nullable: true
 *              type:
 *                type: string
 *                enum: [landed, apartment, unit, studio]
 *                example: landed
 *              price:
 *                type: integer
 *                example: 20,000
 *                nullable: true
 *              image:
 *                type: string
 *                format: binary
 *                description: Optional image file
 *                nullable: true
 *              profile:
 *                type: string
 *                example: This is my favorite house!
 *                nullable: true
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Invalid JSON
 *      '404':
 *        description: User not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.put("/:id", upload.single('image'), imageUploadValidator, updatePropertyValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            let propertyData = req.body;
            if (req.file){
                propertyData.image = req.file
            }
            const data = await propertyController.updateProperty(req.params.id, propertyData);
            if (!data){
                // if there is no data returned then its a 404 not found
                res.sendStatus(404);
            } else {
                // all good
                res.send({result:200, data: data});
            }
        } else {
            // there are errors in the request
            res.status(422).json({errors: errors.array()});
        }
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/property/{id}:
 *  delete:
 *    description: Use to delete a property by ID
 *    tags:
 *      - Properties
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of property to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: property not found
 *      '422':
 *        description: Validation error
 *      '500':
 *        description: Server error
 */
router.delete("/:id", idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()){
            const data = await propertyController.deleteProperty(req.params.id);
            if (!data){
                res.sendStatus(404);
            } else {
                res.send({result: 200, data: data});
            }
        } else {
            res.status(422).json({errors: errors.array()});
        }
    } catch(err) {
        next(err);
    }
});

module.exports = router;