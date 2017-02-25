# koa2-raven
[![NPM version][npm-img]][npm-url]
[![build status][travis-img]][travis-url]
[![coverage status][coverage-img]][coverage-url]
[![greenkeeper][greenkeeper-img]][greenkeeper-url]

[npm-img]: https://img.shields.io/npm/v/koa2-raven.svg
[npm-url]: https://npmjs.org/package/koa2-raven
[travis-img]: https://travis-ci.org/scttcper/koa2-raven.svg
[travis-url]: https://travis-ci.org/scttcper/koa2-raven
[coverage-img]: https://codecov.io/gh/scttcper/koa2-raven/branch/master/graph/badge.svg
[coverage-url]: https://codecov.io/gh/scttcper/koa2-raven  
[greenkeeper-img]: https://badges.greenkeeper.io/scttcper/koa2-raven.svg
[greenkeeper-url]: https://greenkeeper.io/


[raven-node](https://github.com/getsentry/raven-node) middleware for [koa](https://github.com/koajs/koa) v2. Records errors that are thrown from your other middleware and ignores errors that are thrown using `ctx.throw`.


### Install
Install raven > ^1.0.0-beta.1 and koa2-raven
```npm i raven@next koa2-raven --save```

### Usage

```javascript
const Koa = require('koa');
const Raven = require('raven');
const koaRaven = require('koa2-raven');

const app = new Koa();

const client = app.context.raven = Raven
  .config('https://public:private@app.getsentry.com/269')
  .install({ unhandledRejection: true });

koaRaven(app, client);

app.use(() => {
  // This will log in sentry
  throw new Error('Terrible Error');
});

app.listen(3000);
```
