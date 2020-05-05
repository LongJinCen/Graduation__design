const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: "QQ",
  auth: {
    user: '2418204619@qq.com',
    pass: 'qexgcluoyvgeecej'
  }
})

async function sendMail(ctx, target) {
  const verifycode = Math.random().toString().substr(2, 4)
  const body = ctx.request.body
  ctx.session.verifyInfo = {
    verifycode: verifycode,
    email: body.email,
    timeout: Date.now() + 60 * 1000
  }
  const mail = {
    from: '<2418204619@qq.com>',
    to: `<${body.email}>`,
    subject: '广告平台邮箱验证码',
    text: `您的验证码是：【${verifycode}】。请不要把验证码泄露给其他人。`
  }
  const result = await transporter.sendMail(mail)
  return result
}

module.exports = {
  sendMail
}