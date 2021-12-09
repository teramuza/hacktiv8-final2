const jwt = require('jsonwebtoken')
const response = require('../helpers/response')
require('dotenv').config();

const {JWT_SECRET_KEY} = process.env;

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return response.forbiddenResponse(res, 'access token required');

    jwt.verify(token, JWT_SECRET_KEY, function (err, decoded) {
        if (err)
            return response.unauthorizedResponse(res, err.message);

        req.user = decoded;
        return next();
    })
}
