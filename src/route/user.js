const Router = require('@koa/router')
const LoginCheckMiddleware = require('../middleware/login-check')
const userController = require('../controller/user')

const router = new Router({
  prefix: '/ad/user'
})

router.post('/login_email', async (ctx, next) => {
  const body = ctx.request.body
  const result = await userController.login_email(body)
  if (result.length > 0) {
    ctx.session.isLogin = true
    ctx.session.accountName = result[0].accountName
  }
  ctx.body = {
    code: 0,
    status: 'success',
    message: '登录成功'
  }
})

router.post('/login_phone', async (ctx, next) => {
  const body = ctx.request.body
  const verifyInfo = ctx.session.verifyInfo
  if (!verifyInfo || verifyInfo.timeout < Date.now()) {
    ctx.session.verifyInfo = null
    ctx.body = {
      code: -1,
      status: 'failed',
      message: '验证码已过期'
    }
    return
  }
  if (body.phoneNumber === verifyInfo.phoneNumber && body.verifycode === verifyInfo.verifycode) {
    const result = await userController.login_phone({phoneNumber: body.phoneNumber})
    if (result.length > 0) {
      ctx.session.isLogin = true
      ctx.session.accountName = result[0].accountName
    }
    ctx.body = {
      code: 0,
      status: 'success',
      message: '登录成功'
    }
    return
  }
})

router.post('/login_out', async (ctx, next) => {
  if(ctx.session.isLogin) {
    ctx.session.isLogin = false
    ctx.session.accountName = ''
  }
  return
})

router.get('/Info', LoginCheckMiddleware, async (ctx, next) => {
  const accountName = ctx.request.body.accountName
  const result = await userController.info(accountName)
  ctx.body = result[0]
})

router.post('/register/phone', async (ctx, next) => {
  const body = ctx.request.body
  const verifyInfo = ctx.session.verifyInfo
  if (!verifyInfo || verifyInfo.timeout < Date.now()) {
    ctx.session.verifyInfo = null
    ctx.body = {
      code: -1,
      status: 'failed',
      message: '验证码已过期'
    }
    return
  }
  if (body.phoneNumber === verifyInfo.phoneNumber && body.verifycode === verifyInfo.verifycode) {
    const result = await userController.register_phone({phoneNumber: body.phoneNumber})
    if (result.length > 0) {
      ctx.session.isLogin = true
      ctx.session.accountName = result[0].accountName
      ctx.session.userId = result[0]._id
    }
    ctx.body = {
      code: 0,
      status: 'success',
      message: '登录成功'
    }
    return
  }
})

router.post('/register/email', async (ctx, next) => {
  const body = ctx.request.body
  const verifyInfo = ctx.session.verifyInfo
  const data = {
    email: body.email,
    password: body.password,
  }
  if (!verifyInfo || verifyInfo.timeout < Date.now()) {
    ctx.session.verifyInfo = null
    ctx.body = {
      code: -1,
      status: 'failed',
      message: '验证码已过期'
    }
    return
  }
  if (body.email === verifyInfo.email && body.verifycode === verifyInfo.verifycode) {
    await userController.register_email(ctx.session.userId, data)
    ctx.body = {
      code: 0,
      status: 'success',
      message: '登录成功'
    }
    return
  }
})

router.post('/register/setInfo', async (ctx, next) => {
  const body = ctx.request.body
  let userId = ctx.session.userId
  const result = await userController.register_setInfo(userId, body)
})

module.exports = router
