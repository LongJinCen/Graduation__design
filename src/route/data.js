const Router = require('@koa/router')

const router = new Router({
  prefix: '/ad/data'
})

router.get('/indicators', async (ctx, next) => {

})

module.exports = router
