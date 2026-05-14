const CHAVE = "carrinho";

export const carrinhoStorage = {

    obter() {
        const carrinho = localStorage.getItem(CHAVE);
        return carrinho ? JSON.parse(carrinho) : [];
    },

    salvar(carrinho) {
        localStorage.setItem(CHAVE, JSON.stringify(carrinho));
    },

    adicionar(produto, quantidade = 1) {
        const carrinho = this.obter();
        const itemExistente = carrinho.find(item => item.id === produto.id);

        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            carrinho.push({ ...produto, quantidade });
        }

        this.salvar(carrinho);
    },

    aumentarQuantidade(id) {
        const carrinho = this.obter();
        const item = carrinho.find(produto => produto.id === Number(id));

        if (item) {
            item.quantidade += 1;
        }

        this.salvar(carrinho);
    },

    diminuirQuantidade(id) {
        let carrinho = this.obter();
        const item = carrinho.find(produto => produto.id === Number(id));

        if (item) {
            item.quantidade -= 1;

            if (item.quantidade <= 0) {
                carrinho = carrinho.filter(produto => produto.id !== Number(id));
            }
        }

        this.salvar(carrinho);
    },

    remover(id) {
        const carrinho = this.obter().filter(item => item.id !== Number(id));
        this.salvar(carrinho);
    },

    limpar() {
        localStorage.removeItem(CHAVE);
    }
};