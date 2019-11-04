const Koa = require('koa');
const controllers = require('./controllers');
const Router = require('koa-router');

const router = new Router();

router.post('/createPool', controllers.createPool);
// router.post('/user', controller.createUser);
// router.get('/user', controller.getUser);

module.exports = router;