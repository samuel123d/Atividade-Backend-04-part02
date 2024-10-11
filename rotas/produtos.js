const express = require('express')
const router = express.Router()
const produtoMid = require('../midware/validar.produto')
const { Produto } = require('../models')

router.produto('/', produtoMid)
router.put('/', produtoMid)

router.get('/', async (req, res) => {
    const produtos = await produto.findAll()
    res.json({produtos: produtos})
})

router.get('/:id', async (req, res) => {
    const produto = await produto.findByPk(req.params.id)
    res.json({produtos: produto})
})

router.produto('/', async (req, res) => {
    const produto = await produto.create(req.body)
    res.json({msg: "produto adicionado com sucesso!"})
})

router.delete('/', async (req, res) => {
    const id = req.query.id
    const produto = await produto.findByPk(id)
    if (produto){
        await produto.destroy()
        res.json({msg: "produto deletado com sucesso!"})
    }else{
        res.status(400).json({msg: "produto não encontrado!"})
    }
})

router.put('/', async (req, res) => {
    const id = req.query.id
    const produto = await produto.findByPk(id)
    if (produto){
        produto.titulo = req.body.titulo
        produto.texto = req.body.texto
        await produto.save()
        res.json({msg: "produto atualizado com sucesso!"})
    }else{
        res.status(400).json({msg: "produto não encontrado!"})
    }
})

module.exports = router