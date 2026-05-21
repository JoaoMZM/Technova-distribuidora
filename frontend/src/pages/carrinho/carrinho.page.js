import { carrinhoStorage } from "../../storage/carrinho/carrinho.storage.js";
import { produtoApi } from "../../services/produtos/produtos.api.js";

export function carrinhoPage() {
    const app = document.getElementById("app");

    function calcularTotal(carrinho) {
        return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    }

    function renderizar() {
        const carrinho = carrinhoStorage.obter();
        console.log(carrinho);
        const total = calcularTotal(carrinho);

        if (carrinho.length === 0) {
            app.innerHTML = `
                <h2 class="mb-4">Carrinho</h2>
                <div class="alert alert-info">Seu carrinho está vazio atualmente.</div>
                <a href="#/" class="btn btn-primary">Voltar para os produtos</a>
            `;

            carrinhoStorage.atualizarBadge();
            return;
        }

        app.innerHTML = `
            <h2 class="mb-4">Carrinho</h2>

            <table class="table align-middle">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="carrinho-body"></tbody>
            </table>

            <div class="d-flex justify-content-between align-items-center mt-4">
                <h3 id="valor-total">Total: R$ ${total.toFixed(2)}</h3>
                <button id="finalizar-pedido" class="btn btn-success btn-lg">
                    Finalizar Pedido
                </button>
            </div>
        `;

        const body = document.getElementById("carrinho-body");

        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            const precoItem = Number(item.preco || 0);

            body.innerHTML += `
                <tr>
                    <td class="fw-bold">${item.nome}</td>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <button class="btn btn-sm btn-outline-secondary btn-diminuir" data-id="${item.id}">-</button>
                            <span class="fw-bold px-2">${item.quantidade}</span>
                            <button class="btn btn-sm btn-outline-secondary btn-aumentar" data-id="${item.id}">+</button>
                        </div>
                    </td>
                    <td>R$ ${precoItem.toFixed(2)}</td>
                    <td class="text-primary fw-bold">R$ ${subtotal.toFixed(2)}</td>
                </tr>
            `;
        });

        document.querySelectorAll(".btn-aumentar").forEach(btn => {
            btn.addEventListener("click", () => {
                carrinhoStorage.aumentarQuantidade(btn.dataset.id);
                renderizar(); 
            });
        });

        document.querySelectorAll(".btn-diminuir").forEach(btn => {
            btn.addEventListener("click", () => {
                carrinhoStorage.diminuirQuantidade(btn.dataset.id);
                renderizar(); 
            });
        });


        const btnFinalizar = document.getElementById("finalizar-pedido");
        if (btnFinalizar) {
            btnFinalizar.addEventListener("click", async () => {
                const pedido = { itens: carrinho, total };

                try {
                    await produtoApi.finalizarPedido(pedido);
                    alert("Pedido realizado com sucesso!");
                    carrinhoStorage.limpar();
                    location.hash = "#/";
                } catch (error) {
                    alert(error.message || "Erro ao finalizar pedido.");
                }
            });
        }
    }


    renderizar();
}