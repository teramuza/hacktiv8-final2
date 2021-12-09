const successResponse = (res, data, message) => {
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

const badRequestResponse = (res, message, data) => {
    return res.status(400).json({
        status: 'bad request',
        message,
        data
    })
}

const serverErrorResponse = (res, message) => {
    return res.status(503).json({
        status: 'server error',
        message
    })
}

module.exports = {
    successResponse,
    unauthorizedResponse,
    forbiddenResponse,
    badRequestResponse,
    serverErrorResponse
}
