import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { criarNavbar } from "./components/layout/navbar.component.js";
import { produtosPage } from "./pages/produtos/produtos.page.js";
import { carrinhoPage } from "./pages/carrinho/carrinho.page.js";

const root = document.getElementById("root");

const navbar = criarNavbar();

const app = document.createElement("div");
app.id = "app";
app.className = "container mt-4";

root.appendChild(navbar);
root.appendChild(app);

async function router() {
    const rota = location.hash;

    switch (rota) {
        case "#/carrinho":
            carrinhoPage();
            break;

        default:
            await produtosPage();
            break;
    }
}

window.addEventListener("hashchange", router);

router();