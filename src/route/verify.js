const Router = require('@koa/router')

const router = new Router({
  prefix: '/ad/verify'
})

router.post('/phonecode', async (ctx, next) => {

})

router.post('/emailcode', async (ctx, next) => {

})

module.exports = router
