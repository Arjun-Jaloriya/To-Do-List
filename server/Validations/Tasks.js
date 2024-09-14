const Joi = require("joi");

const addTaskValidation = Joi.object({
  title: Joi.string().min(3).required().messages({
    "string.empty": "title is required",
    "string.min": "Title should be at least 3 characters long.",
  }),
  description: Joi.string().allow("", null),
  completed: Joi.boolean(),
});

module.exports = addTaskValidation;
