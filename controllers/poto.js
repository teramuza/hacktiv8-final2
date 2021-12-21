const express = require('express');
const {ValidationError} = require('sequelize');

const router = express.Router();
const responseUtil = require('../helpers/response');
const { Photo } = require('../models');

const createPoto = (req, res) => {
    try {
        const {title,caption,poster_image_url} = req.body;
        const {id} = req.user;
        Photo.create({title,caption,poster_image_url,user_id:id})
            .then((data) => {
                responseUtil.successResponse(
                    res,
                    `Hi your Photo added`,
                    {photo: {id: data.id, title, caption, user_id: id, updatedAt: data.updatedAt, createdAt: data.createdAt}}
                );
            }).catch(err => {
                if (err instanceof ValidationError)
                    return responseUtil.validationErrorResponse(res, err.errors[0].message)
                else
                    return responseUtil.badRequestResponse(res, err);
            })
    } catch (e) {
        return responseUtil.serverErrorResponse(res, e.message);
    }
}

const getPoto = (req, res) => {
    try { 
       Photo.findAll(
    )
            .then((data) => {
                return responseUtil.successResponse(res, null, data)
            })
            .catch(err => {
                return responseUtil.badRequestResponse(res, err);
            })
    } catch (e) {
        return responseUtil.serverErrorResponse(res, e.message);
    }
}

const updatePoto = (req, res) => {
    try {
        const {title,caption,poster_image_url} = req.body;
        const bodyData = {title,caption,poster_image_url};
        const id = parseInt(req.params.photoId);
        Photo.update(bodyData, {where: {id}})
            .then((data) => {
                if (data[0] === 0){
                    return responseUtil.badRequestResponse(res, {message: 'data not found'});
                }

                return responseUtil.successResponse(res, 'update data successfully', bodyData);
            })
            .catch(err => {
                return responseUtil.badRequestResponse(res, err);
            })
    } catch (e) {
        return responseUtil.serverErrorResponse(res, e.message);
    }
}

const deletePoto = (req, res) => {
    try {
        const id = parseInt(req.params.photoId);
        Photo.destroy({where: {id}})
            .then(result => {
                if (result === 0) {
                    return responseUtil.badRequestResponse(res, {message: 'poto not found'});
                }
                return responseUtil.successResponse(res, 'Your poto successfully deleted')
            })
            .catch(err => {
                return responseUtil.badRequestResponse(res, err);
            })
    } catch (e) {
        return responseUtil.serverErrorResponse(res, e.message);
    }
}

router.post('/', createPoto);
router.get('/', getPoto)
router.put('/:photoId', updatePoto);
router.delete('/:photoId', deletePoto);

module.exports = router;
