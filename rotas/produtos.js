const express = require('express');
const router = express.Router();
const produtoMid = require('../midware/validar.produto');
const { Produto } = require('../models');

router.use(produtoMid); // Aplica o middleware para todas as rotas

router.get('/', async (req, res) => {
    const produtos = await Produto.findAll();
    res.json({ produtos });
});

router.get('/:id', async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    if (produto) {
        res.json({ produto });
    } else {
        res.status(404).json({ msg: "Produto não encontrado!" });
    }
});

router.post('/', async (req, res) => {
    const produto = await Produto.create(req.body);
    res.json({ msg: "Produto adicionado com sucesso!", produto });
});

router.delete('/', async (req, res) => {
    const id = req.query.id;
    const produto = await Produto.findByPk(id);
    if (produto) {
        await produto.destroy();
        res.json({ msg: "Produto deletado com sucesso!" });
    } else {
        res.status(400).json({ msg: "Produto não encontrado!" });
    }
});

router.put('/', async (req, res) => {
    const id = req.query.id;
    const produto = await Produto.findByPk(id);
    if (produto) {
        produto.titulo = req.body.titulo;
        produto.texto = req.body.texto;
        await produto.save();
        res.json({ msg: "Produto atualizado com sucesso!" });
    } else {
        res.status(400).json({ msg: "Produto não encontrado!" });
    }
});

module.exports = router;
