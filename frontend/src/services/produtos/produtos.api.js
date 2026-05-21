const API_URL = "http://localhost:8080";
export const produtoApi = {

    async listarTodos() {

        const response = await fetch(`${API_URL}/produtos`);

        const produtos = await response.json();

        return produtos.map(produto => ({
            ...produto,
            imagem: `${API_URL}/uploads/images/${produto.imagem}`
        }));
    }
};