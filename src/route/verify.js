const Router = require('@koa/router')
const { sendMail } = require('../verify/email')
const { sendPhone } = require('../verify/phone')

const router = new Router({
  prefix: '/ad/verify'
})

router.post('/phonecode', async (ctx, next) => {
  const result = await sendPhone(ctx)
  if (result.data.code !== 2) {
    ctx.body = {
      code: -1,
      message: result.data.msg
    }
  } else {
    ctx.body = {
      code: 0,
      message: '发送成功'
    }
  }
})

router.post('/emailcode', async (ctx, next) => {
  const result = await sendMail(ctx)
  if (result.messageId) {
    ctx.body = {
      code: 0,
      message: '发送成功'
    }
    return
  }
  ctx.body = {
    code: -1,
    message: '发送失败'
  }
})

module.exports = router
