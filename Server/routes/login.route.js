const router = require('express').Router()

const {login, register, userHealth, adminLogin, logout} = require("../controller/login.controller")

router.get('/', userHealth)

router.post('/login', login)

router.post('/adminlogin', adminLogin)

router.post('/register', register)

router.put('/logout/:user_id', logout)

module.exports = router 