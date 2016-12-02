const httpErrors = require('http-errors');

module.exports = function sentry(app, client) {
  app.on('error', (err, ctx) => {
    // ignore non server errors
    if (err instanceof httpErrors.HttpError) {
      return;
    }
    const parsedReq = client.parsers.parseRequest(ctx.request);
    client.captureException(err, parsedReq);
  });
};
