const mongoose = require('mongoose');

// Definindo o esquema de movimentação
const MovimentacaoSchema = new mongoose.Schema({
  produtoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produto', // Referência ao modelo Produto
    required: true,
  },
  tipo: {
    type: String,
    enum: ['entrada', 'saida'], // Tipos permitidos: entrada ou saída
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
  },
  valor: {
    type: Number,
    required: true, // Valor da movimentação, se aplicável
  },
  data: {
    type: Date,
    default: Date.now, // Data padrão como a atual
  },
});

// Criando o modelo de movimentação
const Movimentacao = mongoose.model('Movimentacao', MovimentacaoSchema);

// Exportando o modelo
module.exports = Movimentacao;















// const mongoose = require('mongoose');

// // Definindo o esquema de movimentação
// const MovimentacaoSchema = new mongoose.Schema({
//   produtoId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Produto', // Referência ao modelo Produto
//     required: true,
//   },
//   tipo: {
//     type: String,
//     enum: ['entrada', 'saida'], // Tipos permitidos
//     required: true,
//   },
//   quantidade: {
//     type: Number,
//     required: true,
//   },
//   data: {
//     type: Date,
//     default: Date.now, // Data padrão como a atual
//   },
// });

// // Criando o modelo de movimentação
// const Movimentacao = mongoose.model('Movimentacao', MovimentacaoSchema);



// // Exportando o modelo
// module.exports = Movimentacao;


