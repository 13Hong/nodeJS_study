// 导入 express
const express = require('express')
const article_handler = require('../router_handler/article')
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
const expressJoi = require('@escook/express-joi')
const {add_article_schema} = require('../schema/article')
// 创建路由对象
const router = express.Router()

// 发布新文章
router.post('/add',upload.single('cover_img'),expressJoi(add_article_schema),article_handler.addArticle)
router.get('/list',article_handler.getArticleList)

// 向外共享路由对象
module.exports = router