const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const mockApi = require('./mock');

const { demo } = mockApi;

const app = new Koa();
const router = new Router();

const parseApi = (api) => {
  const splited = api.trim().replace(/\s+/g, ' ').split(' ');
  if(splited.length === 1) {
    return ['get', splited[0]]
  }
  return [splited[0].toLowerCase(), splited[1]]
}

demo && Object.keys(demo).forEach(api => {
  const [method, url] = parseApi(api);
  router[method](url, demo[api]);
})

app.use(cors());
app.use(router.routes());

const port = 5002;
app.listen(port, () => {
  console.log('mock server started on http://localhost:'+ port);
})