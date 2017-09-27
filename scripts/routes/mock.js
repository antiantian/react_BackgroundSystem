const express = require('express')
const router = express.Router()
const opporList = require('../mock/opporList.json');
const Mock = require('mockjs');

console.log("1233445")
// 直接读取json文件导出
router.get('/api/web/login', function (req, res) {
  res.json(opporList)
})
router.post('/mock/web/login', function (req, res) {
  res.json(opporList)
})

// 基于mockjs生成数据, 优势在于对项目代码无侵入，并且支持fetch，xhr等多种方式的拦截
router.get('/backend/employee', function (req, res) {
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1
    }]
  })
  res.json(data)
})

module.exports = router