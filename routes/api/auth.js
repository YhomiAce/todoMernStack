const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const UserController = require('../../controllers/UserController')
const {validate, loginValidation} = require('../../helpers/validators');

// @route  api/auth
// @method GET
// @access Public
router.get('/', auth, UserController.getLoggedInUser);

router.post('/', loginValidation(), validate, UserController.loginUser);

module.exports = router;