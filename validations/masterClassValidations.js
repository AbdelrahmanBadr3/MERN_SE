const Joi = require("../node_modules/joi/lib");



module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string().required(),
      description: Joi.string().required(),
      educator:Joi.object().required(),
      payment: Joi.string().required(),
      places: Joi.number().integer().required(),
      availablePlaces: Joi.number().integer(),
      MasterClassDuration: Joi.string(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      levelOfStudents: Joi.string(),
      effort: Joi.string(),
      isAvailable: Joi.boolean(),
      courses:Joi.array(),
      listOfApplied:Joi.array(),
      listOfAccepted:Joi.array(),
      educationalOrganization:Joi.object()

    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string(),
      description: Joi.string(),
      educator:Joi.object(),
      payment: Joi.string(),
      places: Joi.number().integer(),
      availablePlaces: Joi.number().integer(),
      MasterClassDuration: Joi.string(),
      startDate: Joi.date(),
      endDate: Joi.date(),
      levelOfStudents: Joi.string(),
      effort: Joi.string(),
      isAvailable: Joi.boolean(),
      courses:Joi.array(),
      listOfApplied:Joi.array(),
      listOfAccepted:Joi.array(),
      educationalOrganization:Joi.object()
    };

    return Joi.validate(request, updateSchema);
  }
};
