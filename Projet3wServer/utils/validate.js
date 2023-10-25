import Joi from 'joi';

import {
  schemaNews, schemaNewsCountry, schemaUser
} from './schema.js';

export const validateUser = (req, res, next) => {
  const { body } = req;
  try {
    Joi.assert(body, schemaUser);
    next();
    console.log("validateCountry success", body)
  } catch (e) {
    console.log("validateCountry error")
    res.status(422).send({
      error: e.details[0].message
    });
  }
}


export const validateCountry = (req, res, next) => {
  console.log("req", req.body, req.params)
  const { body } = req;

  try {
    Joi.assert(body, schemaNewsCountry);
    next();
    console.log("validateCountry success", body)
  } catch (e) {
    console.log("validateCountry error")
    res.status(422).send({
      error: e.details[0].message
    });
  }
}