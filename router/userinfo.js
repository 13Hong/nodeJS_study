const epxress = require('express')
const router = epxress.Router()
const userinfo_handler = require('../router_handler/userinfo')
const expressJoi = require('@escook/express-joi')
const { reg_update_schema } = require('../schema/user')

router.get('/userinfo',userinfo_handler.getUserInfo)
router.post('/userinfo',expressJoi(reg_update_schema),userinfo_handler.updateUserInfo)

module.exports = router