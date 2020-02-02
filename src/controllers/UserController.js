const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const authConfig = require('../config/auth');
const bcrypt = require('bcryptjs');

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
            
            // const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
            //     expiresIn: 86400,
            // } );

            return res.send(usuario);
            
        } catch (err){
            return res.status(400).send({error: 'Registration failed'});
        }
    },

    async index(req, res){
        const users = await User.find();

        return res.json(users);
    },

    async update(req, res, next){
        const {password} = req.body;

        bcrypt.hash(password, 10, async function(err, hash){
            req.body.password = hash;

            
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
            return res.json(user);
        });
    },

    async destroy(req, res){
        await User.findByIdAndRemove(req.params.id);

        return res.send();
    }
}



