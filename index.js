const statuses = require('statuses');

module.exports = function sentry(app, client) {
  app.on('error', (err, ctx) => {
    // set status ourselves? https://github.com/koajs/koa/issues/871
    // ENOENT support
    if (err.code === 'ENOENT') err.status = 404;
    // default to 500
    if (typeof err.status !== 'number' || !statuses[err.status]) {
      err.status = 500;
    }
    ctx.status = err.status;
    if (ctx.status < 500) {
      return;
    }
    const parsedReq = client.parsers.parseRequest(ctx.request);
    client.captureException(err, parsedReq);
  });
};
