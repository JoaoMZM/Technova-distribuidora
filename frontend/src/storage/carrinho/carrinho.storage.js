import { produtoApi } from "../../services/produtos/produtos.api";

const CHAVE_CARRINHO = "carrinho";
const produtos = await produtoApi.listarTodos();

export const carrinhoStorage = {
    obter() {
        const dados = localStorage.getItem(CHAVE_CARRINHO);
        return dados ? JSON.parse(dados) : [];
    },

    adicionar(novoItem) {
        const carrinho = this.obter(); 

        const produto = produtos.find(p => String(p.id_produto) === String(novoItem.id));

        const index = carrinho.findIndex(item => String(item.id) === String(novoItem.id));
        const quantidadeNoCarrinho = index !== -1 ? carrinho[index].quantidade : 0;

        if (quantidadeNoCarrinho + novoItem.quantidade > produto.estoque_produto) {
            alert(`Desculpa, estamos sem estoque.`);
            return;
        }

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
        const produto = produtos.find(produto => produto.id_produto == id);
        if (item) {
            if (item.quantidade > produto.estoque_produto) {
                alert("Desculpe, estamos sem estoque!");
                return;
            }

            console.log(item.quantidade)
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