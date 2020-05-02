const Router = require('@koa/router')

const router = new Router({
  prefix: '/ad/user'
})

router.post('/login_email', async (ctx, next) => {

})

router.post('/login_phone', async (ctx, next) => {

})

router.post('/login_out', async (ctx, next) => {

})

router.get('/Info', async (ctx, next) => {

})

router.post('/register/phone', async (ctx, next) => {

})

router.post('/register/email', async (ctx, next) => {

})

router.post('/register/setInfo', async (ctx, next) => {

})

module.exports = router
