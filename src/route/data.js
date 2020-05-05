const Router = require('@koa/router')
const controller = require('../controller/data')

const router = new Router({
  prefix: '/ad/data'
})

router.get('/indicators', async (ctx, next) => {
  const phoneNumber = ctx.session.phoneNumber
  // const result = await controller.getIndicators(phoneNumber)
  // ctx.body = {
  //   code: 0,
  //   data: result
  // }
  ctx.body = {
    code: 0,
  }
})

router.post('/indicators', async (ctx, next) => {
  const phoneNumber = ctx.session.phoneNumber
  // const creativeId = ctx.query.creativeId
  // const result = await controller.setIndicators(phoneNumber, creativeId)
  // ctx.body = {
  //   code: 0,
  //   message: '设置成功'
  // }
})

module.exports = router
