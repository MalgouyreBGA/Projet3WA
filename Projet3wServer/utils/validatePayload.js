import Joi from 'joi';

import {
  schemaPointRelais
} from './schema.js';

export const validatePayload = (req, res, next) => {
  console.log("validatePayload")
  const {
    body
  } = req;

  try {
    Joi.assert(body, schemaPointRelais);
    next();
    console.log("validatePayload success")
  } catch (e) {
    console.log("validatePayload error")
    res.status(422).send({
      error: e.details[0].message
    });
  }
}