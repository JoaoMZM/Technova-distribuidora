export function criarImagem(src, alt) {
    const imagem = document.createElement("img");

    imagem.src = src;
    imagem.alt = alt;
    imagem.className = "card-img-top imagem-produto";

    return imagem;
}