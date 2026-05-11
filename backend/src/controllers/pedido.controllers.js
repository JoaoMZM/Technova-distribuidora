import pedidoRepository from "../repositories/pedido.repository.js";
import { ItensPedidos } from "../models/Itens_pedido.js";
import { Pedido } from "../models/Pedido.js";
import produtoRepository from "../repositories/produto.repository.js";

const pedidoControllers = {
    adicionarPedido: async (req, res) => {
        try {
            let { statusPedido, itens } = req.body;

            const itensPedidos = itens.map(async item => {
                const idProduto = item.idProduto;
                const produtoSelecionado = await produtoRepository.selecionarPorId(idProduto);
                const quantidade = item.quantidade;
                const precoUnitario = produtoSelecionado[0].preco_produto;
                ItensPedidos.criar({ precoUnitario, subTotal, quantidade, idProduto });
            });

            const valorTotal = ItensPedidos.calcularValorTotal(itensPedidos);

            const pedido = Pedido.criar({ statusPedido, valorTotal })

            const result = await pedidoRepository.criarPedido(pedido, itensPedidos)
            return res.status(200).json({ message: "Pedido adicionado com sucesso", result })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }


    }
}

export default pedidoControllers;