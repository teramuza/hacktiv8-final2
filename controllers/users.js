const bcrypt = require('bcrypt');
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
        await bcrypt.hash(password, 10, async (err, encrypt) => {
            await User.create({full_name, email, username, password: encrypt, profile_image_url, age, phone_number});
            return responseUtil.successResponse(res, {}, `Hi ${full_name}, your account was created successfully`);
        })
    } catch (e) {
        console.log(e);
        return responseUtil.badRequestResponse(res, e.message);
    }
}

module.exports = {register};
