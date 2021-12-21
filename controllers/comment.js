const express = require('express');
const {ValidationError} = require('sequelize');

const router = express.Router();
const responseUtil = require('../helpers/response');
const { Comment } = require('../models');

const createComment = (req, res) => {
    try {
        const {PhotoId ,comment} = req.body;
        const {id} = req.user;
        Comment.create({photo_id: PhotoId ,comment, user_id:id})
            .then((data) => {
                responseUtil.successResponse(
                    res,
                    `Hi your Comment added`,
                    {comment: {id: data.id, PhotoId, comment, user_id: id, updatedAt: data.updatedAt, createdAt: data.createdAt}}
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

const getComment = (req, res) => {
    try { 
       Comment.findAll({
        include: {
            model: User,
            attributes: ['username']
        }
       })
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

const updateComment = (req, res) => {
    try {
        const {comment} = req.body;
        const bodyData = {comment};
        const id = parseInt(req.params.commentId);
        Comment.update(bodyData, {where: {id}})
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

const deleteComment = (req, res) => {
    try {
        const id = parseInt(req.params.commentId);
        Comment.destroy({where: {id}})
            .then(result => {
                if (result === 0) {
                    return responseUtil.badRequestResponse(res, {message: 'Comment not found'});
                }
                return responseUtil.successResponse(res, 'Your Comment successfully deleted')
            })
            .catch(err => {
                return responseUtil.badRequestResponse(res, err);
            })
    } catch (e) {
        return responseUtil.serverErrorResponse(res, e.message);
    }
}

router.post('/', createComment);
router.get('/', getComment)
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);

module.exports = router;
