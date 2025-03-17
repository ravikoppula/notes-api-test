
const authService = require('../services/authService');

exports.signup = async (req, res, next) => {

    try {

        const user = await authService.signup(req.body);

        res.status(201).json(user);

    } catch (error) {

        next(error);

    }

};

exports.login = async (req, res, next) => {

    try {

        const { username, password } = req.body;

        const result = await authService.login(username, password);

        res.json(result);

    } catch (error) {

        next(error);

    }


};


