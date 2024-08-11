const Joi = require("joi");

module.exports.recipieSchema = Joi.object({
  recipie: Joi.object({
    image: Joi.string().allow("", null),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
  }),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
