const API_URL = "http://localhost:8080";
import 'axios'
import axios from 'axios';
import { carrinhoStorage } from '../../storage/carrinho/carrinho.storage';
export const produtoApi = {
    async listarTodos() {
        try {
            const response = await axios.get(`${API_URL}/produtos`);
            const dadosRecebidos = await response.data;
            console.log(response)

            const listaDeProdutos = Array.isArray(dadosRecebidos)
                ? dadosRecebidos
                : (dadosRecebidos.produtos || dadosRecebidos.data || []);

            return listaDeProdutos.map(produto => ({
                ...produto,
                imagem: `${API_URL}/${produto.imagem_produto.replace('uploads/image/', 'uploads/images/')}`
            }));

        } catch (error) {
            console.error("Erro na requisição da API:", error);
            return [];
        }
    },
    async finalizarPedido(carrinho) {
        const itensCarrinho = carrinhoStorage.obter();
        
        const itens = itensCarrinho.map((item) => {
            return {
                idProduto: Number(item.id),
                quantidade: item.quantidade
            }
        })
        const body = {
            "statusPedido": 'PENDENTE',
            "itens": itens
        }  
        carrinhoStorage.limpar();
        const res = await axios.post(`${API_URL}/pedidos`, body);
        return res.data;
    }
};