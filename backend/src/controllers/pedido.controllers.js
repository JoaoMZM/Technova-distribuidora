import pedidoRepository from "../repositories/pedido.repository.js";
import { ItensPedidos } from "../models/Itens_pedido.js";
import { Pedido } from "../models/Pedido.js";

const pedidoControllers = {
    adicionarPedido: async (req, res) => {
        let { status, itens, } = req.body;

        const idProduto = itens.idProduto;
        const produtoSelecionado = await produtoRepository.selecionarPorId(idProduto);
        const quantidade = itens.quantidade;
        const precoUnitario = produtoSelecionado[0].preco_produto;
        const subTotal = ItensPedidos.calcularSubTotal(itens);


        const itensPedidos = itens.map(item => {
            ItensPedidos.criar({ precoUnitario, subTotal, quantidade, idProduto });
        });
    


    }
}

