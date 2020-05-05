const Router = require('@koa/router')
const LoginCheckMiddleware = require('../middleware/login-check')
const userController = require('../controller/user')

const router = new Router({
  prefix: '/ad/user'
})

router.post('/login_email', async (ctx, next) => {
  const body = ctx.request.body
  const result = await userController.login_email(body)
  console.log(result, 'result')
  if (result.length > 0 && result[0].password === body.password) {
    ctx.session.isLogin = true
    ctx.session.phoneNumber = result[0].phoneNumber
    ctx.body = {
      code: 0,
      status: 'success',
      message: '登录成功'
    }
  } else if (result.length > 0) {
    ctx.body = {
      code: -1,
      status: 'fail',
      message: '密码不正确'
    }
  } else {
    ctx.body = {
      code: -1,
      message: '未注册'
    }
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
      ctx.session.phoneNumber = result[0].phoneNumber
    }
    ctx.body = {
      code: 0,
      status: 'success',
      message: '登录成功'
    }
    return
  } else {
    ctx.body = {
      code: -1,
      status: 'failed',
      message: '验证码不正确'
    }
  }
})

router.post('/login_out', async (ctx, next) => {
  if(ctx.session.isLogin) {
    ctx.session.isLogin = false
    ctx.session.phoneNumber = ''
  }
  ctx.body = {
    code: 0,
    message: '退出登录成功'
  }
  return
})

router.get('/Info', LoginCheckMiddleware, async (ctx, next) => {
  const phoneNumber = ctx.session.phoneNumber
  const result = await userController.info(phoneNumber)
  console.log(result, 'result')
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
    const result = await userController.register_phone(ctx.session.phoneNumber, {
      email: '',
      accountName: '',
      industry: '',
      password: '',
      phoneNumber: body.phoneNumber,
      balance: 0,
      consumption: 0,
      budget: 0,
      putIntPlains: 0,
      auditRejectPlains: 0,
      budgetShortPlains: 0,
      problemPlains: 0
    })
    if (!ctx.session.phoneNumber) {
      ctx.session.phoneNumber = body.phoneNumber
    }
    ctx.session.isLogin = true
    ctx.body = {
      code: 0,
      status: 'success',
      message: '注册成功'
    }
    return
  } else {
    ctx.body = {
      code: -1,
      message: '验证码不正确'
    }
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
    const result = await userController.register_email(ctx.session.phoneNumber, data)
    ctx.session.isLogin = true
    ctx.body = {
      code: 0,
      status: 'success',
      message: '注册成功'
    }
    return
  } else {
    ctx.body = {
      code: -1,
      status: 'failed',
      message: '验证码不正确'
    }
  }
})

router.post('/register/setInfo', async (ctx, next) => {
  const body = ctx.request.body
  let phoneNumber = ctx.session.phoneNumber
  const result = await userController.register_setInfo(phoneNumber, body)
  if (result.result.ok > 0) {
    ctx.body = {
      code: 0,
      message: '设置成功'
    }
  } else {
    ctx.body = {
      code: -1,
      message: '设置失败'
    }
  }
})

module.exports = router
