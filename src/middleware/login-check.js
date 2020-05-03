module.exports = async function (ctx, next) {
  if (ctx.session.isLogin) {
    await next()
    return
  }
  ctx.body = {
    code: 403,
    message: '未登录'
  }
}