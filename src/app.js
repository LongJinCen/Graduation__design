const Koa = require('koa')
const http = require('http')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(bodyParser())
app.use(async (ctx, next) => {
  console.log(ctx.cookies.get('Cookie_1'))
  console.log(ctx.request.body)
  ctx.body = '搜到'
})

const server = http.createServer(app.callback())

server.on("listening", () => {
  console.log(`server start listening at http://127.0.0.1:3000`)
})

server.listen(3000)