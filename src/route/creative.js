const Router = require('@koa/router')
const controller = require('../controller/creative')
const multer = require('koa-multer')

const upload = multer({ dest: '../assets/' });

const router = new Router({
  prefix: '/ad/creative'
})

router.get('/data', async (ctx, next) => {
  const creativeId = ctx.query.creativeId
  const result = await controller.data(creativeId)
  ctx.body = {
    code: 0,
    data: result
  }
})

router.post('/upload', upload.single('file'), async (ctx, next) => {

})

router.post('/create', async (ctx, next) => {
  const body = ctx.request.body
  const phoneNumber = ctx.session.phoneNumber
  const result = await controller.create(body, phoneNumber)
  if (result.result.n > 0) {
    ctx.body = {
      code: 0,
      message: '创建成功'
    }
  } else {
    ctx.body = {
      code: -1,
      message: '创建失败'
    }
  }
})

module.exports = router
