const express = require('express');
const bcrypt = require('bcrypt');
const {ValidationError} = require('sequelize');

const router = express.Router();
const responseUtil = require('../helpers/response');
const { User } = require('../models');

const register = async (req, res) => {
    try {
        const {
            full_name,
            email,
            username,
            password,
            profile_image_url,
            age,
            phone_number
        } = req.body;
        await bcrypt.hash(password, 10, (err, encrypt) => {
            User.create({full_name, email, username, password: encrypt, profile_image_url, age, phone_number})
                .then(() => responseUtil.successResponse(
                        res,
                        `Hi ${full_name}, your account was created successfully`,
                        {user: {email, full_name, username, profile_image_url, age, phone_number}},
                        201
                    ))
                .catch((e) => {
                    if (e instanceof ValidationError)
                        return responseUtil.validationErrorResponse(res, e.errors[0].message)
                    else {
                        return responseUtil.badRequestResponse(res, e);
                    }
                });
        })
    } catch (e) {
        return responseUtil.serverErrorResponse(res, e.message);
    }
}

router.post('/register', register);

module.exports = router;
