const mongoose = require('mongoose');

// Definindo o esquema de Produto
const ProdutoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true, // Garantir que o ID seja único
  },
  nome: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true, // Valor do produto
  },
  quantidade: {
    type: Number,
    required: true, // Quantidade disponível
  },
  unidade: {
    type: String,
    required: true, // Unidade de medida
  },
  dataEntrada: {
    type: Date,
    required: true, // Data de entrada do produto
    default: Date.now, // Definir data de entrada como a data atual por padrão
  },
});

// Exportando o modelo de Produto
const Produto = mongoose.model('Produto', ProdutoSchema);
module.exports = Produto;



















// const mongoose = require('mongoose');

// const ProdutoSchema = new mongoose.Schema({
//   id: { type: String, required: true, unique: true }, // Garantir que o ID seja único
//   nome: { type: String, required: true },
//   valor: { type: Number, required: true }, // Valor do produto
//   quantidade: { type: Number, required: true }, // Quantidade disponível
//   unidade: { type: String, required: true }, // Unidade de medida
//   dataEntrada: { type: Date, required: true }, // Data de entrada do produto
// });

// // Função para registrar a saída de um produto
// const handleSaida = async (id, quantidadeSaida) => {
//   await axios.post(`http://localhost:5000/api/produtos/saida/${id}`, { quantidadeSaida });
//   fetchProdutos(); // Atualiza a lista de produtos após a saída
// };

// // Exportando o modelo de produto
// module.exports = mongoose.model('Produto', ProdutoSchema);





// const mongoose = require('mongoose');

// const ProdutoSchema = new mongoose.Schema({
//   id: { type: String, required: true, unique: true }, // Garantir que o ID seja único
//   nome: { type: String, required: true },
//   valor: { type: Number, required: true },
//   quantidade: { type: Number, required: true },
//   unidade: { type: String, required: true }, // Adicione esta linha
//   dataEntrada: { type: Date, required: true },
// });

// const handleSaida = async (id, quantidadeSaida) => {
//   await axios.post(`http://localhost:5000/api/produtos/saida/${id}`, { quantidadeSaida });
//   fetchProdutos(); // Atualiza a lista de produtos após a saída
  
// };


// module.exports = mongoose.model('Produto', ProdutoSchema);





// const mongoose = require('mongoose');

// const ProdutoSchema = new mongoose.Schema({
//   id: { type: String, required: true },
//   nome: { type: String, required: true },
//   valor: { type: Number, required: true },
//   quantidade: { type: Number, required: true },
//   dataEntrada: { type: Date, required: true },
// });

// module.exports = mongoose.model('Produto', ProdutoSchema);
