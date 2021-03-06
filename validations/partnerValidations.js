const Joi = require('../node_modules/joi/lib')

module.exports = {
    createValidation: request => {
        const createSchema = {
            partnerName: Joi.string().required(),
            partnerPhoneNumber: Joi.string(),
            partnerLocation: Joi.string(),
            partnerPartners: Joi.array(),
            fieldOfWork: Joi.array(),
            partnerProjects: Joi.array(),
            partnerEvents: Joi.array(),
            feedbackForm: Joi.array(),

        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            partnerName: Joi.string(),
            partnerPhoneNumber: Joi.string(),
            partnerLocation: Joi.string(),
            partnerPartners: Joi.array(),
            fieldOfWork: Joi.array(),
            partnerProjects: Joi.array(),
            partnerEvents: Joi.array(),
            feedbackForm: Joi.array(),
        }

        return Joi.validate(request, updateSchema)
    }, 
}