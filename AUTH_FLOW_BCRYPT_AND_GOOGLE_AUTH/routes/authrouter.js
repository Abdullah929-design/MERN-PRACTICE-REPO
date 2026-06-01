const router=require("express").Router();
const {signup, login}=require("../controllers/authcontoller");
const{signupValidation, loginValidation}=require("../middleware/authvalidation");
const { googleLogin } = require('../controllers/googleController')

router.post("/signup",signupValidation,signup);
router.post("/login",loginValidation,login);
router.post('/auth/google', googleLogin)

module.exports = router;