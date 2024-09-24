const express = require('express');
const Produto = require('../models/Produto');
const Movimentacao = require('../models/Movimentacao');
const router = express.Router();

// Função para lidar com erros
const handleError = (res, error, message, status = 500) => {
  res.status(status).send({ error: message, details: error.message });
};

// Rota para adicionar um produto
router.post('/', async (req, res) => {
  const { id, nome, valor, quantidade, unidade, dataEntrada } = req.body;

  try {
    // Verifica se o produto já existe
    const produtoExistente = await Produto.findOne({ id });
    if (produtoExistente) {
      return res.status(400).send({ error: 'Produto com esse ID já existe.' });
    }

    const novoProduto = new Produto({
      id,
      nome,
      valor,
      quantidade,
      unidade,
      dataEntrada: dataEntrada || Date.now(),
    });

    await novoProduto.save();

    // Registrar a movimentação de entrada
    const movimentacao = new Movimentacao({
      produtoId: novoProduto._id,
      tipo: 'entrada',
      quantidade: novoProduto.quantidade || 1,
      valor: novoProduto.valor * (novoProduto.quantidade || 1), // Calcula o valor total da entrada
      data: new Date(), // Define a data como a atual
    });
    await movimentacao.save();

    res.status(201).send(novoProduto);
  } catch (error) {
    handleError(res, error, 'Erro ao cadastrar produto', 400);
  }
});

// Rota para obter todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.send(produtos);
  } catch (error) {
    handleError(res, error, 'Erro ao buscar produtos');
  }
});

// Rota para deletar um produto
router.delete('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) {
      return res.status(404).send({ message: 'Produto não encontrado' });
    }
    res.status(200).send({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    handleError(res, error, 'Erro ao deletar produto');
  }
});

// Rota para atualizar a quantidade de um produto (entrada)
router.put('/entrada/:id', async (req, res) => {
  const { quantidade } = req.body;
  try {
    // Verifica se a quantidade é válida
    if (!quantidade || quantidade <= 0) {
      return res.status(400).send({ message: 'Quantidade inválida' });
    }

    // Encontra o produto pelo ID
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).send({ message: 'Produto não encontrado' });
    }

    // Atualiza a quantidade do produto
    produto.quantidade += Number(quantidade);
    await produto.save();

    // Registra a movimentação de entrada
    const movimentacao = new Movimentacao({
      produtoId: produto._id,
      tipo: 'entrada',
      quantidade,
      valor: produto.valor * quantidade,
      data: new Date(),
    });
    await movimentacao.save();

    res.send({ message: 'Quantidade atualizada com sucesso', produto });
  } catch (error) {
    handleError(res, error, 'Erro ao atualizar quantidade do produto');
  }
});

// Rota para registrar a saída de um produto
router.post('/saida/:id', async (req, res) => {
  const { quantidadeSaida } = req.body;
  try {
    // Verifica se a quantidade é válida
    if (!quantidadeSaida || quantidadeSaida <= 0) {
      return res.status(400).send({ message: 'Quantidade inválida para saída' });
    }

    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).send({ message: 'Produto não encontrado' });
    }

    // Verifica se a quantidade solicitada é maior que a disponível
    if (produto.quantidade < quantidadeSaida) {
      return res.status(400).send({ message: 'Quantidade insuficiente em estoque' });
    }

    // Atualiza a quantidade do produto
    produto.quantidade -= quantidadeSaida;
    await produto.save();

    // Registra a movimentação
    const movimentacao = new Movimentacao({
      produtoId: produto._id,
      tipo: 'saida',
      quantidade: quantidadeSaida,
      valor: produto.valor * quantidadeSaida,
      data: new Date(),
    });
    await movimentacao.save();

    res.status(200).send({ message: 'Saída registrada com sucesso', produto });
  } catch (error) {
    handleError(res, error, 'Erro ao registrar saída de produto');
  }
});

// Rota para obter movimentações
router.get('/movimentacoes', async (req, res) => {
  try {
    const movimentacoes = await Movimentacao.find().populate('produtoId');
    res.send(movimentacoes);
  } catch (error) {
    handleError(res, error, 'Erro ao buscar movimentações');
  }
});

// Rota para deletar uma movimentação
router.delete('/movimentacoes/:id', async (req, res) => {
  try {
    const movimentacao = await Movimentacao.findByIdAndDelete(req.params.id);
    if (!movimentacao) {
      return res.status(404).send({ message: 'Movimentação não encontrada' });
    }
    res.status(200).send({ message: 'Movimentação excluída com sucesso' });
  } catch (error) {
    handleError(res, error, 'Erro ao excluir movimentação');
  }
});

module.exports = router;


