const mongoose = require('mongoose');

const MovimentacaoSchema = new mongoose.Schema({
  produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
  tipo: { type: String, enum: ['entrada', 'saida'], required: true },
  quantidade: { type: Number, required: true },
  data: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Movimentacao', MovimentacaoSchema);
