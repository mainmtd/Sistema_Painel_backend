const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const authConfig = require('../config/auth');

const router = express.Router();

module.exports = {
    async create(req, res){
        const {user} = req.body;

        try {

            if(await User.findOne({user})){
                return res.status(400).send({error: 'Usuário já existe'})
            }
            
            const usuario = await User.create(req.body);

            usuario.password = undefined;
            
            const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
                expiresIn: 86400,
            } );

            return res.send({usuario, token});
            
        } catch (err){
            return res.status(400).send({error: 'Registration failed'});
        }
    },

    async index(req, res){
        const users = await User.find();

        return res.json(users);
    },
}



