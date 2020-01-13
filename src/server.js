const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser')

const Painel = require('./models/Painel');
const routes = require('./routes');

const PainelController = require('./controllers/PainelController');



const app = express();
const server = http.Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



mongoose.connect('mongodb://localhost/dbpainel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado ao Banco de Dados")
});

app.use(express.json());


app.get('/', PainelController.index);

app.use(routes);
require('./controllers/ProjectController')(app);

server.listen(3000, async () => {
    await PainelController.create();
});