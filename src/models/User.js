const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

//criptografia da senha
//executa uma função antes de salvar
UserSchema.pre('save', async function(next){
    const hash =   await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
    
})

const User = mongoose.model('User', UserSchema)

module.exports = User;