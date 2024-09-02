const express = require('express')
const router = express.Router()

const userHandler = require('../router_handler/user')
// 注册用户
router.post('/reguser',userHandler.regUser)

// 登录
router.post('/login',userHandler.login)

module.exports = router