const ResponseBuilder = (res) => {
    return {
        success: (data, msg = 'Thành công.') => {
            return res.sendStatus(200).send({
                data,
                status: true,
                msg,
            })
        },
        error: (error) => {
            return res.sendStatus(400).send({
                data: {},
                status: false,
                msg: error.message || 'Thất bại.'
            })
        }
    }
}

module.exports = ResponseBuilder;