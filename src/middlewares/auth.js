const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const autHeader = req.headers.authorization;

    if(!autHeader){
        return res.status(401).send({error: 'O token não foi informado'});
    }

    const parts = autHeader.split(' ');

    if(!parts.length === 2){
        return res.status(401).send({error: 'Token inválido'});
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: 'Formato de Token inválido'});        
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({error: 'Token incorreto'});

        req.userId = decoded.id;

        return next();
    })
}