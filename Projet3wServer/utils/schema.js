import Joi from 'joi';

//.required()
export const schemaNewsCountry = Joi.object({
    from:Joi.string().length(10).pattern(new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')),
    country:Joi.string().pattern(new RegExp('^[A-Za-z]{1,3}$')).required(),
    q:Joi.string()
})

export const schemaNews = Joi.object({
    from:Joi.string().length(10).pattern(new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')),
    country:Joi.string().pattern(new RegExp('^[A-Za-z]{1,3}$')),
    q:Joi.string()
})

export const schemaUser = Joi.object({
    username:Joi.string().alphanum().min(3).max(30).required(),
    password:Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&*])'))
        .min(8)
        .max(64)
        .required()
        .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one digit, and one special character',
        }
    ),
})