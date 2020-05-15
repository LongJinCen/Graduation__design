const Koa = require('koa')
const http = require('http')
const bodyParser = require('koa-bodyparser')
const creativeRouter = require('./route/creative')
const dataRouter = require('./route/data')
const promotionRouter = require('./route/promotion')
const userRouter = require('./route/user')
const verifyRouter = require('./route/verify')
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const dbConfig = require('./config/db')

const app = new Koa()

app.keys = ['fdskfjds', 'jkjklcmwrew'];

app.use(session({
  store: redisStore(dbConfig.REDIS_CONFIG)
}));

app.use(bodyParser())

app.use(creativeRouter.routes()).use(creativeRouter.allowedMethods())
app.use(dataRouter.routes()).use(dataRouter.allowedMethods())
app.use(promotionRouter.routes()).use(promotionRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(verifyRouter.routes()).use(verifyRouter.allowedMethods())

const server = http.createServer(app.callback())

server.on("listening", () => {
  console.log(`server start listening at http://127.0.0.1:3000`)
})

server.listen(3000)