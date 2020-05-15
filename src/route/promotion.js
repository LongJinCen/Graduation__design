const Router = require('@koa/router')
const ObjectId = require('mongodb').ObjectId
const controller = require('../controller/promotion')

const router = new Router({
  prefix: '/ad/promotion'
})

router.get('/list', async (ctx, next) => {
  const query = ctx.query
  const result = await controller.list(query)
  ctx.body = {
    code: 0,
    message: '查询成功',
    data: result
  }
})

router.del('/del', async (ctx, next) => {
  const creativeId = crtx.query.creativeId
  const result = await controller.del(creativeId)
  ctx.body = {
    code: 0,
    message: '删除成功'
  }
})

module.exports = router
