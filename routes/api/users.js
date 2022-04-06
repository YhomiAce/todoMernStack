const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/UserController');
const {validate, registerValidation} = require('../../helpers/validators');

// @route  api/users
// @method POST
// @access Public
// @desc register user
router.post('/', registerValidation(), validate ,UserController.registerUser);


module.exports = router;