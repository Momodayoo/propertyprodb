// property controller
const property = require('../models/property');
/**
 *
 * @returns Array<property>
 */
const getProperties = async () => {
    const data = await property.findAll({ raw: true});
    return data;
};
const getProperty = async (id) => {
    const data = await property.findOne({ where: { id: id }, raw: true });
    return data;
};
const getPropertyByUser = async (id) => {
    const data = await property.findAll({ where: { userId: id } , raw: true});
    return data;
};

const getPropertiesByType = async (type) => {
    const data = await property.findAll({where: {type: type}});
    return data;
}
const createProperty = async (data) => {
    const item = await property.create(data);
    return item;
}
const updateProperty = async (id, data) => {
    const item = await property.update(data, {where: {id: id}});
    return item;
}
const deleteProperty = async (id) => {
    const item = await property.destroy({ where: { id: id } });
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