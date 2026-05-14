import { carrinhoStorage } from "../../storage/carrinho/carrinho.storage.js";
import { pedidoApi } from "../../services/produtos/produtos.api.js";

export function carrinhoPage() {

    const app = document.getElementById("app");

    function calcularTotal(carrinho) {
        return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    }

    function renderizar() {

        const carrinho = carrinhoStorage.obter();
        const total = calcularTotal(carrinho);

        app.innerHTML = `
            <h2 class="mb-4">Carrinho</h2>

            <table class="table">
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

            <h3 id="valor-total"></h3>

            <button id="finalizar pedido" class="btn btn-success">
                finalizar pedido
            </button>
        `;

        const body = document.getElementById("carrinho-body");

        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;

            body.innerHTML += `
                <tr>
                    <td>${item.nome}</td>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <button class="btn btn-sm btn-outline-secondary btn-diminuir" data-id="${item.id}">-</button>
                            <span>${item.quantidade}</span>
                            <button class="btn btn-sm btn-outline-secondary btn-aumentar" data-id="${item.id}">+</button>
                        </div>
                    </td>
                    <td>R$ ${item.preco.toFixed(2)}</td>
                    <td>R$ ${subtotal.toFixed(2)}</td>
                </tr>
            `;
        });

        document.getElementById("valor-total").innerText =
            `Total: R$ ${total.toFixed(2)}`;

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

        document.getElementById("finalizar pedido").addEventListener("click", async () => {
            const pedido = { itens: carrinho, total };

            try {
                await pedidoApi.finalizarPedido(pedido);
                alert("Pedido realizado com sucesso");
                carrinhoStorage.limpar();
                location.hash = "#/";
            } catch (error) {
                alert(error.message);
            }
        });
    }

    renderizar();
}