import { carrinhoStorage } from "../../storage/carrinho/carrinho.storage.js";

export function criarCardProduto(produto) {

    const div = document.createElement("div");
    div.className = "col-md-4 mb-4";


    const nome = produto.nome_produto || "Sem nome";
    const precoBruto = produto.preco_produto || 0;
    const precoFormatado = Number(precoBruto).toFixed(2);
    const imagemUrl = produto.imagem || "";
    console.log(produto)
    const estoqueDisponivel = Number(produto.estoque_produto);

    div.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img src="${imagemUrl}" class="card-img-top p-2" alt="${nome}" style="height: 200px; object-fit: contain;">
            <div class="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 class="card-title font-weight-bold text-dark text-truncate">${nome}</h5>
                    <p class="card-text text-primary h5 mb-3">R$ ${precoFormatado}</p>
                </div>
                
                <div>
                    <div class="d-flex align-items-center mb-3">
                        <button class="btn btn-sm btn-outline-secondary btn-menos">-</button>
                        <span class="mx-3 fw-bold qtd-produto">1</span>
                        <button class="btn btn-sm btn-outline-secondary btn-mais">+</button>
                    </div>
                    
                    <button class="btn btn-primary w-100 btn-add-carrinho">
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </div>
    `;


    const btnMenos = div.querySelector(".btn-menos");
    const btnMais = div.querySelector(".btn-mais");
    const txtQtd = div.querySelector(".qtd-produto");
    const btnAdd = div.querySelector(".btn-add-carrinho");

    btnMenos.addEventListener("click", () => {
        let qtd = parseInt(txtQtd.textContent);
        if (qtd > 1) {
            txtQtd.textContent = qtd - 1;
        }
    });

    btnMais.addEventListener("click", () => {
        let qtd = parseInt(txtQtd.textContent);

        if (qtd >= estoqueDisponivel) {
            alert(`Limite atingido! Desculpe, temos apenas ${estoqueDisponivel} unidades em estoque.`);
            return;
        }

        txtQtd.textContent = qtd + 1;
    });

    btnAdd.addEventListener("click", () => {
        const quantidade = parseInt(txtQtd.textContent);
        const dadosItens = {
            quantidade: txtQtd.textContent,
            idProduto: produto.id_produto,
            idPedido: produto.id_pedido
        }

        let qtd = parseInt(txtQtd.textContent);

        if (qtd >= estoqueDisponivel) {
            alert(`Limite atingido! Desculpe, temos apenas ${estoqueDisponivel} unidades em estoque.`);
            return;
        }

        const produtoFormatadoParaCarrinho = {
            id: String(produto.id_produto),
            nome: nome,
            preco: Number(precoBruto),
            quantidade: quantidade
        };

        carrinhoStorage.adicionar(produtoFormatadoParaCarrinho);

        alert(`${nome} (${quantidade}x) adicionado ao carrinho!`);

        txtQtd.textContent = "1";
    });

    return div;
}