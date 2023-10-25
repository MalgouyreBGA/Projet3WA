import express from 'express';

import {
    getLastNews,
    postNewUser, login
} from './main/controller.js';
import {
    validateUser
} from './utils/validate.js';
//router.route('/').post(validateCountry, recherchePointsRelais);
export const router = express.Router();
router.route('/newUser').post(validateUser, postNewUser);
router.route('/login').post(validateUser, login);
router.route('/preferences').put();

router.route('/').get(getLastNews);
router.route('/saveNew').post();
router.route('/favoris').get();
router.route('/deleteNew').delete();
