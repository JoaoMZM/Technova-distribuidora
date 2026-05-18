import { db } from "../configs/database.js";
import produtoRepository from "./produto.repository.js";

const pedidoRepository = {

    criarPedido: async (pedido, itensPedido) => {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();
            
            const sqlPed = 'INSERT INTO pedidos (valor_total, status_pedido) VALUES (?, ?);';
            const valuesPed = [pedido.valorTotal, pedido.statusPedido];
            const [rowsPed] = await conn.execute(sqlPed, valuesPed);
            const idPedido = rowsPed.insertId;

            itensPedido.forEach(async item => {
                const idProduto = item.idProduto;
                const sqlItem = 'INSERT INTO itens_pedido (quantidade, preco_unitario, subtotal, id_pedido, id_produto) VALUES (?, ?, ?, ?, ?);'
                const valuesItem = [item.quantidade, item.precoUnitario, item.subTotal, idPedido, idProduto];

                const produtoSelecionado = await produtoRepository.selecionarPorId(idProduto);

                const sqlProduto = 'UPDATE produtos SET estoque_produto = estoque_produto - ? WHERE id_produto = ?;';
                const valuesProduto = [item.quantidade, idProduto];
                await conn.execute(sqlItem, valuesItem);
                await conn.execute(sqlProduto, valuesProduto);
            });

            await conn.commit();
            return rowsPed;
        } catch (error) {
            await conn.rollback();
            throw new Error(error);

        } finally {
            conn.release();
        }
    },
    
    selectPedidos: async () => {
        const sql = "SELECT * FROM pedidos;";
        const rows = db.execute(sql);
        return rows;
    },

    selectPedidosId: async (id) => {
       const sql = "SELECT * FROM pedidos WHERE id_pedido = ?;";
        const rows = db.execute(sql, [id]);
        return rows;
    }
}

export default pedidoRepository;