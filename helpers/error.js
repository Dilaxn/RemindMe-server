const error = async (error, req, res, next) => {
    res.status(400).send({message: error.message});
}

module.exports = error;