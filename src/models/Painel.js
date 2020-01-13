const mongoose = require('mongoose');


const PainelSchema = new mongoose.Schema({
    codigo_painel: {
        type: Number,
        required: true,
    },
    nome: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        default: ""
    },
    data_alteracao: {
        type: Date,
        default: Date.now()
    },
    alerta: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model("Paineis", PainelSchema);

