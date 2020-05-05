module.exports = async function (ctx, next) {
  if (ctx.session.isLogin) {
    await next()
    return
  }
  ctx.redirect('/ad/login.html')
}