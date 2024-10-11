const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const produtoRota = require('./rotas/produtos')
app.use(express.json());
app.use("/produtos", produtoRota);

const produtos = {};

app.get('/', (req, res) => {
    res.json({ msg: "Esta rodando!" });
});



const server = app.listen(8080, () => {
  console.log("Servidor pronto na porta 8080");
});

module.exports = server;
