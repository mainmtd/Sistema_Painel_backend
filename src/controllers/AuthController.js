const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const authConfig = require('../config/auth');

const router = express.Router();

module.exports = {

    async authenticate (req, res) {
        const {user, password} = req.body;

        const usuario = await (await User.findOne({user}).select('+password'));

        if(!usuario) {
            return res.status(400).send({error: 'Usuário não encontrado'})
        }
        if(!await bcrypt.compare(password, usuario.password)){
            return res.status(400).send({error: 'Senha incorreta'})
        }

        usuario.password = undefined;

        const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
            expiresIn: 86400,
        } );

        res.send({usuario, token});
    }
}