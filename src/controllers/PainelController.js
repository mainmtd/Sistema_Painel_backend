const Painel = require('../models/Painel');


module.exports = {
    async index(req, res){

        const paineis = await Painel.find();

        return res.json(paineis);
    },

    async create(req, res){
        await Painel.find().then(async (paineis) => {
            let painel_noticias = paineis.find(pnl => pnl.codigo_painel == 0);
            let painel_gestao = paineis.find(pnl => pnl.codigo_painel == 1);
            let painel_acontece = paineis.find(pnl => pnl.codigo_painel == 2);
            let painel_alerta = paineis.find(pnl => pnl.codigo_painel == 3);

            if(!painel_noticias){
                console.log('Painel de notícias ainda não foi criado');
                console.log('Realizando a criação do painel de notícias...');
                await Painel.create({ 
                    codigo_painel: 0,
                    nome: 'painel_noticias'
                }).then(() => {
                    console.log("Painel de notícias criado")
                });
                
            }
            if(!painel_gestao){
                console.log('Painel de gestão não foi criado');
                console.log('Realizando a criação do painel de gestão...');
                await Painel.create({ 
                    codigo_painel: 1,
                    nome: 'painel_gestao'
                }).then(() => {
                    console.log("Painel de gestão criado");
                });
            }
            if(!painel_acontece){
                console.log('Painel acontece não foi criado');
                console.log('Realizando a criação do painel acontece...');
                await Painel.create({ 
                    codigo_painel: 2,
                    nome: 'painel_acontece'
                }).then(() => {
                    console.log("Painel acontece criado");
                });
            }
            if(!painel_alerta){
                console.log('Painel de alerta não foi criado');
                console.log('Realizando a criação do painel de alerta...');
                await Painel.create({ 
                    codigo_painel: 3,
                    nome: 'painel_alerta'
                }).then(() => {
                    console.log("Painel alerta criado");
                });
            }
            
            
        });

        
    },
    async update(req, res){
        const painel = await Painel.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.json(painel);
    },

    async show(req, res){
        const painel = await Painel.findById(req.params.id);

        return res.json(painel);
    }
    

    
}
