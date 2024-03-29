const express = require('express')
const error = require("../helpers/error");
const {updateName} = require("../controllers/auth.controller");
const {readProfilePicture} = require("../controllers/auth.controller");
const {profilePicUpload} = require("../helpers/file_upload");
const {updateProfilePic} = require("../controllers/auth.controller");
const {readAllUsers} = require("../controllers/auth.controller");
const {authController} = require("../controllers/auth.controller");
const router = express.Router()

// Load Controllers
const {
    registerController,
    activationController,
    signinController,
    forgotPasswordController,
    resetPasswordController,
    googleController,
    facebookController
} = require('../controllers/auth.controller')


const {
    validSign,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helpers/valid')

router.post('/register',
    validSign,
    registerController)

router.post('/login',
    validLogin, signinController)

router.post('/activation', activationController)
router.post('/auth', authController);

router.get('/readAllUsers', readAllUsers);

// forgot reset password
router.put('/forgotpassword', forgotPasswordValidator, forgotPasswordController);
router.put('/resetpassword', resetPasswordValidator, resetPasswordController);

// Google and Facebook Login
router.post('/googlelogin', googleController)
router.post('/facebooklogin', facebookController)

//update profile pic
router.patch('/pic', profilePicUpload.single('avatar'), updateProfilePic,error);
router.get('/:emp_id/pic', readProfilePicture);
router.patch('/name', updateName);

// router.post('/pic', updateProfilePic)

module.exports = router