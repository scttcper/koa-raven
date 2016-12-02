module.exports = function sentry(app, client) {
  app.on('error', (err, ctx) => {
    // ignore non server errors
    if (ctx.status < 500) {
      return;
    }
    const parsedReq = client.parsers.parseRequest(ctx.request);
    client.captureException(err, parsedReq);
  });
};
