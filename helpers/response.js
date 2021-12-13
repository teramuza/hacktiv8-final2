const successResponse = (res, message, data) => {
    return res.status(200).json({
        status: 'success',
        message,
        data
    })
}

const unauthorizedResponse = (res, message) => {
    return res.status(401).json({
        status: 'unauthorized',
        message
    })
}

const forbiddenResponse = (res, message) => {
    return res.status(403).json({
        status: 'forbidden',
        message
    })
}

const badRequestResponse = (res, data) => {
    return res.status(400).json({
        status: 'bad request',
        data
    })
}

const serverErrorResponse = (res, data) => {
    return res.status(503).json({
        status: 'server error',
        data
    })
}

const validationErrorResponse = (res, message) => {
    return res.status(400).json({
        status: 'validation error',
        message
    })
}

module.exports = {
    successResponse,
    unauthorizedResponse,
    forbiddenResponse,
    badRequestResponse,
    serverErrorResponse,
    validationErrorResponse
}
