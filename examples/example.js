const Koa = require('koa');
const Raven = require('raven');

const app = new Koa();
const client = Raven
  .config(false)
  .install({ unhandledRejection: true });

app.on('error', (err, ctx) => {
  const parsedReq = client.parsers.parseRequest(ctx.request);
  client.captureException(err, parsedReq);
});

app.use(() => {
  throw new Error('Terrible Error');
});

app.listen(3000);
