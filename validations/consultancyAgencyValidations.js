const Joi = require('../node_modules/joi/lib')

module.exports = {
    createValidation: request => {
        const createSchema = {
            consultancyAgencyName: Joi.string().required(),
            consultancyAgencyManager: Joi.string(),
            consultancyAgencyHeadquarters: Joi.string(),
            consultancyAgencyRate: Joi.number(),
            consultancyAgencyRevenues: Joi.number(),
            consultancyAgencyRevenuePerEmployee: Joi.number(),
            consultancyAgencyLocation: Joi.array(),
            consultancyAgencyPhoneNumber: Joi.string(),
            consultancyAgencyPartners: Joi.array(),
            consultancyAgencyMembers: Joi.array(),
            consultancyAgencyEvents: Joi.array(),
            consultancyAgencyOffers: Joi.array(),
            consultancyAgencyFiscalYear: Joi.date(),
         };

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            consultancyAgencyName: Joi.string(),
            consultancyAgencyManager: Joi.string(),
            consultancyAgencyHeadquarters: Joi.string(),
            consultancyAgencyRate: Joi.number(),
            consultancyAgencyRevenues: Joi.number(),
            consultancyAgencyRevenuePerEmployee: Joi.number(),
            consultancyAgencyLocation: Joi.array(),
            consultancyAgencyPhoneNumber: Joi.string(),
            consultancyAgencyPartners: Joi.array(),
            consultancyAgencyMembers: Joi.array(),
            consultancyAgencyEvents: Joi.array(),
            consultancyAgencyReports: Joi.array(),
            consultancyAgencyOffers: Joi.array(),
            consultancyAgencyFiscalYear: Joi.date(),
        }

        return Joi.validate(request, updateSchema)
    }, 
}