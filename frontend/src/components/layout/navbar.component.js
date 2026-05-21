import { carrinhoStorage } from "../../storage/carrinho/carrinho.storage.js";

export function criarNavbar() {

  const nav = document.createElement("nav");

  nav.className =
    "navbar navbar-expand-lg navbar-dark bg-dark px-4";

  const carrinho = carrinhoStorage.obter();

  const quantidade = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  nav.innerHTML = `
    <div class="container-fluid">

      <a class="navbar-brand" href="#/">
        <img
          src="../../../public/Design sem nome (2).png"
          alt="Tech Nova"
          height="100"
        />
      </a>

      <div class="d-flex">

        <a
          class="btn btn-outline-light position-relative"
          href="#/carrinho"
        >
          Carrinho

          <span
            class="
              position-absolute
              top-0
              start-100
              translate-middle
              badge
              rounded-pill
              bg-danger
            "
          >
            ${quantidade}
          </span>
        </a>

      </div>

    </div>
  `;

  return nav;
}