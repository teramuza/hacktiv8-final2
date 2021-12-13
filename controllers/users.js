const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ValidationError} = require('sequelize');

const router = express.Router();
const responseUtil = require('../helpers/response');
const { User } = require('../models');
const {JWT_SECRET_KEY} = process.env;

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

const login = (req, res) => {
    try {
        const {email, password} = req.body;
        if (email && password) {
            User.findOne({where: {email}})
                .then((user) => {
                    if (user) {
                        const isValid = bcrypt.compareSync(password, user.password);
                        if (isValid) {
                            const userData = {
                                id: user.id,
                                email: user.email,
                                username: user.username,
                            }
                            const token = jwt.sign(userData, JWT_SECRET_KEY, {
                                expiresIn: '1h',
                            });
                            return responseUtil.successResponse(res, 'login success', {token});
                        } else {
                            return responseUtil.unauthorizedResponse(res, 'password invalid')
                        }
                    }
                    return responseUtil.unauthorizedResponse(res, 'email is not registered')
                })
        } else {
            return responseUtil.badRequestResponse(res, {error: {message: 'email & password required'}})
        }
    } catch (e) {
        return responseUtil.serverErrorResponse(res, e.message);
    }
}

router.post('/register', register);
router.post('/login', login);

module.exports = router;