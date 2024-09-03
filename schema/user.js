// 导入定义验证规则的包
const joi = require('joi')

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body : {
        username,
        password
    },
}
// 验证规则对象 - 更新用户基本信息
exports.reg_update_schema = {
    body:{
        id,
        nickname,
        email
    }
}