// Property controller
const Property = require('../models/property');
/**
 *
 * @returns Array<Property>
 */
const getProperties = async () => {
    const data = await Property.findAll({ raw: true});
    return data;
};
const getProperty = async (id) => {
    const data = await Property.findOne({ where: { id: id }, raw: true });
    return data;
};
const getPropertyByUser = async (id) => {
    const data = await Property.findAll({ where: { userId: id } , raw: true});
    return data;
};

const getPropertiesByType = async (type) => {
    const data = await Property.findAll({where: {type: type}});
    return data;
}
const createProperty = async (data) => {
    const item = await Property.create(data);
    return item;
}
const updateProperty = async (id, data) => {
    const item = await Property.update(data, {where: {id: id}});
    return item;
}
const deleteProperty = async (id) => {
    const item = await Property.destroy({ where: { id: id } });
    return item;
};
module.exports = {
    getProperty,
    getProperties,
    getPropertyByUser,
    getPropertiesByType,
    createProperty,
    updateProperty,
    deleteProperty,
};