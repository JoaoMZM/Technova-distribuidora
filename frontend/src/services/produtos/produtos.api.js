const API_URL = "http://localhost:8080";

export const produtoApi = {
    async listarTodos() {
        try {
            const response = await fetch(`${API_URL}/produtos`);
            const dadosRecebidos = await response.json();

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
    }
};