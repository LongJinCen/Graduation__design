const axios = require('axios')

async function sendPhone(ctx) {
  const body = ctx.request.body
  const verifycode = Math.random().toString().substr(2, 4)
  const content = `您的验证码是：${verifycode}。请不要把验证码泄露给其他人。`
  const result = await axios.get('https://106.ihuyi.com/webservice/sms.php', {
    params: {
      method: 'Submit',
      account: 'C74194369',
      password: '351466cd2dc2275169a840fd1b44e576',
      mobile: body.phoneNumber,
      content: content,
      format: 'json'
    }
  })
  if (result.data.code === 2) {
    ctx.session.verifyInfo = {
      verifycode: verifycode,
      phoneNumber: body.phoneNumber,
      timeout: Date.now() + 60 * 1000
    }
  }
  return result
}

module.exports = {
  sendPhone
}
