import { produtoApi } from "../../services/produtos/produtos.api.js";
import { criarCardProduto } from "../../components/produtos/card.component.js";
import { criarLinha } from "../../components/shared/coluna-bootstrap.component.js";

export async function produtosPage() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <h2 class='mb-4'>Produtos</h2>

        <input
            type="text"
            id="busca"
            class="form-control mb-4"
            placeholder="Buscar produto..."
        />

        <div id="lista-produtos"></div>
    `;

    try {
        const produtos = await produtoApi.listarTodos();

        function renderizarProdutos(lista) {
            const container = document.getElementById("lista-produtos");
            container.innerHTML = "";

            if (lista.length === 0) {
                container.innerHTML = `
                    <p class="text-muted">Nenhum produto encontrado.</p>
                `;
                return;
            }

            const linha = criarLinha();

            lista.forEach(produto => {
                linha.appendChild(criarCardProduto(produto));
            });

            container.appendChild(linha);
        }

        renderizarProdutos(produtos);

        document.getElementById("busca").addEventListener("input", (e) => {
            const termo = e.target.value.toLowerCase().trim();

            const filtrados = produtos.filter(p =>
                p.nome.toLowerCase().includes(termo)
            );

            renderizarProdutos(filtrados);
        });

    } catch (error) {
        app.innerHTML += `
            <div class="alert alert-danger">
                ${error.message}
            </div>
        `;
    }
}