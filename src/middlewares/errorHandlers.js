const errorHandler = (err, req, res, next) => {
    return res.status(err.status).json({ success: false, msg: err.message })
}

export default errorHandler
