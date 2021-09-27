const express = require('express');
const client = require('../database');

const router = express.Router();

router.post('/market', async (req, res) => {
    try {

        const nome = req.body.nome;
        const valor = req.body.valor;

        const valores = [
            nome,
            valor
        ]

        const [marketList] = await (await client.query('INSERT INTO market.market_list(nome, valor) VALUES ( $1, $2 ) RETURNING *', valores)).rows;

        return res.status(200).send(marketList);
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            error: 'Falha ao cadastrar lista de mercado'
        });
    }
})

router.put('/market/:id', async (req, res) => {
    try {
        const id = req.params.id;

        let valores = [ id ];
        let count = 2;
        let setUpdate = '';

        if(req.body.nome){
            valores.push(req.body.nome)
            if(count > 2) setUpdate += ', ';
            setUpdate += 'nome = $' + count;
            count++;
        }
        if(req.body.valor){
            valores.push(req.body.valor)
            if(count > 2) setUpdate += ', ';
            setUpdate += 'valor = $' + count;
            count++;
        }

        if(!req.body.nome || !req.body.valor) return res.status(400).send('Necessário informar ao menos um campo!');

        const query = `
            UPDATE
                market.market_list
            SET
                ${setUpdate}
            WHERE
                id = $1    
            RETURNING *
        `;

        const [marketList] = await (await client.query(query, valores)).rows;

        return res.status(200).send(marketList);
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            error: 'Falha ao atualizar lista de mercado'
        });
    }
})

router.delete('/market/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const [marketList] = await (await client.query('SELECT * FROM market.market_list WHERE id = $1', [ id ])).rows;

        if(!marketList) return res.status(403).send('Item informado não foi encontrado!');

        await (await client.query('DELETE FROM market.market_list WHERE id = $1', [ id ])).rows;

        return res.status(200).send('Item removido com sucesso');
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            error: 'Falha ao acessar o item da lista de mercado'
        });
    }
})

router.get('/market', async (req, res) => {
    try {

        const marketList = await (await client.query('SELECT * FROM market.market_list')).rows;

        let marketListFormated = {
            itens: [],
            total: 0
        };

        for(let item of marketList){
            marketListFormated.itens.push(item.nome);
            marketListFormated.total = ((+marketListFormated.total) + (+item.valor)).toFixed(2);
        }

        return res.status(200).send(marketListFormated);
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            error: 'Falha ao acessar lista de mercado'
        });
    }
})

router.get('/market/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const [marketList] = await (await client.query('SELECT * FROM market.market_list WHERE id = $1', [ id ])).rows;

        console.log(marketList)

        return res.status(200).send(marketList);
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            error: 'Falha ao acessar o item da lista de mercado'
        });
    }
})

module.exports = app => app.use('/api', router);