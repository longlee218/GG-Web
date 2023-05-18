const { check } = require('express-validator');

const notEmptyMsg = (field) => field + ' không được bỏ trống.';
const wrongFormatMsg = (field) => field + ' không đúng định dạng.';

const Validator = {
    validateRegisterUser: () => {
        return [
            check('email', notEmptyMsg('Email')).not().isEmpty(),
            check('email', wrongFormatMsg('Email')).not().isEmail(),
            check('username', notEmptyMsg('Username')).not().isEmpty(),
            check('username', wrongFormatMsg('Email')).not().isLength({ min: 3 }),
            check('password', notEmptyMsg('Mật khẩu')).not().isEmpty(),
            check('gender').not().isEmpty(),
        ];
    },
    validateLogin: () => {
        return [
            check('user.email', 'Invalid does not Empty').not().isEmpty(),
            check('user.email', 'Invalid email').isEmail(),
            check('user.password', 'password more than 6 degits').isLength({ min: 6 })
        ];
    }
}
module.exports = Validator;
