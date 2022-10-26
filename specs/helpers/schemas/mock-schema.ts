import * as joi from 'joi';
export const ValidateSchema = joi.object({
    name: joi.string().required(),
    age: joi.number().required(),
});

export const ValidateAgeSchema = joi.object({
    age: joi.number().required(),
});
