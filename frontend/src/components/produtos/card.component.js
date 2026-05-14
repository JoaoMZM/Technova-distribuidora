import { criarImagem } from "./imagem.component.js";
import { criarBotao } from "./button.component.js";
import { carrinhoStorage } from "../../storage/carrinho/carrinho.storage.js";

export function criarCardProduto(produto) {

    const coluna = document.createElement("div");
    coluna.className = "col-md-4 mb-4";

    const card = document.createElement("div");
    card.className = "card h-100 shadow";

    const imagem = criarImagem(
        produto.imagem,
        produto.nome
    );

    const body = document.createElement("div");
    body.className = "card-body d-flex flex-column";

    const titulo = document.createElement("h5");
    titulo.innerText = produto.nome;

    const preco = document.createElement("p");
    preco.innerText = `R$ ${produto.preco.toFixed(2)}`;

    // CONTROLE DE QUANTIDADE
    let quantidade = 1;

    const controle = document.createElement("div");
    controle.className = "d-flex align-items-center gap-2 mb-3";

    const btnDiminuir = document.createElement("button");
    btnDiminuir.innerText = "-";
    btnDiminuir.className = "btn btn-sm btn-outline-secondary";

    const spanQuantidade = document.createElement("span");
    spanQuantidade.innerText = quantidade;

    const btnAumentar = document.createElement("button");
    btnAumentar.innerText = "+";
    btnAumentar.className = "btn btn-sm btn-outline-secondary";

    btnAumentar.addEventListener("click", () => {
        quantidade += 1;
        spanQuantidade.innerText = quantidade;
    });

    btnDiminuir.addEventListener("click", () => {
        if (quantidade > 1) {
            quantidade -= 1;
            spanQuantidade.innerText = quantidade;
        }
    });

    controle.appendChild(btnDiminuir);
    controle.appendChild(spanQuantidade);
    controle.appendChild(btnAumentar);

    // BOTÃO
    const botao = criarBotao(
        "Adicionar ao carrinho",
        () => {
            carrinhoStorage.adicionar(produto, quantidade);
            alert(`${quantidade} produto(s) adicionados`);
        }
    );

    body.appendChild(titulo);
    body.appendChild(preco);
    body.appendChild(controle);
    body.appendChild(botao);

    card.appendChild(imagem);
    card.appendChild(body);

    coluna.appendChild(card);

    return coluna;
}