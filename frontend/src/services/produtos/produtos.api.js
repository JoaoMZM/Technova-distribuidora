const API_URL = "http://localhost:8080";
import 'axios'
import axios from 'axios';
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
        const body = {
            
        }
        const res = await axios.post(`${API_URL}/pedidos`);
        return res.json();
    }
};