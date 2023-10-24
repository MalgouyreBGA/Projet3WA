import express from 'express';

import {
    recherchePointsRelais
} from './main/controller.js';
import {
    validatePayload
} from '../utils/validatePayload.js';
//validatePayload,
export const router = express.Router();
router.route('/').post(validatePayload, recherchePointsRelais);