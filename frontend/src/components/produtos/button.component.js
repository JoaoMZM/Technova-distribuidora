export function criarBotao(texto, onClick) {
    const botao = document.createElement("button");

    botao.className = "btn btn-primary w-100";
    botao.innerText = texto;

    botao.addEventListener("click", onClick);

    return botao;
}