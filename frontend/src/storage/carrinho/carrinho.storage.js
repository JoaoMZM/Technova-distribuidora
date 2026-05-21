
const CHAVE_CARRINHO = "carrinho"; 

export const carrinhoStorage = {
    obter() {
        const dados = localStorage.getItem(CHAVE_CARRINHO);
        return dados ? JSON.parse(dados) : [];
    },

    adicionar(novoItem) {
        const carrinho = this.obter();
        
        const index = carrinho.findIndex(item => String(item.id) === String(novoItem.id));

        if (index !== -1) {

            carrinho[index].quantidade += novoItem.quantidade;
        } else {

            carrinho.push(novoItem);
        }

        localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
        this.atualizarBadge();
    },

    aumentarQuantidade(id) {
        const carrinho = this.obter();
        const item = carrinho.find(item => String(item.id) === String(id));
        if (item) {
            item.quantidade += 1;
            localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
        }
        this.atualizarBadge();
    },

    diminuirQuantidade(id) {
        let carrinho = this.obter();
        const item = carrinho.find(item => String(item.id) === String(id));
        if (item) {
            item.quantidade -= 1;
            if (item.quantidade <= 0) {
                carrinho = carrinho.filter(item => String(item.id) !== String(id));
            }
            localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
        }
        this.atualizarBadge();
    },

    limpar() {
        localStorage.removeItem(CHAVE_CARRINHO);
        this.atualizarBadge();
    },

    atualizarBadge() {
        const carrinho = this.obter();
        const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        
        const badge = document.querySelector(".badge, #carrinho-badge, .header-cart-count");
        if (badge) {
            badge.textContent = totalItens;
        }
    }
};