const express = require('express');

const PainelController = require('./controllers/PainelController');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');


const routes = express.Router();

routes.get('/painel', PainelController.index);
routes.get('/painel/:id', PainelController.show);
routes.put('/painel/:id', PainelController.update);

routes.post('/user/create', UserController.create);
routes.get('/user/', UserController.index);

routes.post('/user/authenticate', AuthController.authenticate);



module.exports = routes;