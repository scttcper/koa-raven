const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const Raven = require('raven');

const koaRaven = require('../index');

const app = new Koa();
module.exports = app;

app.use(bodyParser());

const client = Raven
  .config('https://public:private@app.getsentry.com/269')
  .install({ captureUnhandledRejections: true });
app.context.raven = client;

koaRaven(app, client);

router.get('/', (ctx, next) => {
  ctx.body = 'ok';
  return next();
});

router.get('/throw', () => {
  throw new Error('Terrible Error');
});

router.get('/normalThrow', (ctx, next) => {
  ctx.throw(400, 'You missed something');
  return next();
});

router.get('/unauthThrow', (ctx, next) => {
  ctx.assert(true === false, 401, 'You are logged out');
  return next();
});

router.post('/throwPost', () => {
  throw new Error('Terrible Error');
});

router.get('/throwUser', (ctx) => {
  ctx.body = 'ok';
  Raven.setContext({
    user: {
      email: 'matt@example.com',
      id: '123',
    },
  });
  throw new Error('Terrible Error');
});

app.use(router.routes());
app.use(router.allowedMethods());

if (!module.parent) {
  app.listen(3000);
}
