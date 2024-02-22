// property controller
const property = require('../models/property');
const property = require('../models/property');
const property = require('../models/property');
const { saveImage } = require("../utility/uploader");
/**
 *
 * @returns Array<property>
 */
const getProperty = async () => {
    const data = await property.findAll({ raw: true});
    return data;
};
const getProperties = async (id) => {
    const data = await property.findOne({ where: { id: id }, raw: true });
    return data;
};
const getPropertyByUser = async (id) => {
    const data = await property.findAll({ where: { userId: id } , raw: true});
    return data;
};
const createProperty = async (data) => {
    const { image, ...propertyData } = data;
    // if there is an image in the data to handle
    if (image){
        propertyData.image = await saveImage(image, "property");
    } else {
        propertyData.image = "default.png";
    }

    const property = await property.create(propertyData);
    return property;
}
const updateProperty = async (id, data) => {
    const { image, ...propertyData } = data;
    // if there is an image in the data to handle
    if (image){
        propertyData.image = await saveImage(image, "property");
    } 
    const property = await property.update(propertyData, {where: {id: id}});
    return property;
}
const deleteProperty = async (id) => {
    const property = await property.destroy({ where: { id: id } });
    return property;
};
module.exports = {
    getProperty,
    getProperties,
    getPropertyByUser,
    createProperty,
    updateProperty,
    deleteProperty,
};