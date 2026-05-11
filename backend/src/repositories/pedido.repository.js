import { db } from "../configs/database";

const pedidoRepository = {

    criarPedido: async (pedido, itensPedido) => {
        const conn = await db.getConnection();
        try {
            const sqlPed = 'INSERT INTO pedidos (valor_total, status_pedido) VALUES (?, ?);';
            const valuesPed = [pedido.valorTotal, pedido.status];
            const [rowsPed] = await conn.execute(sqlPed, valuesPed);

            const idPedido = rowsPed.insertId;

            itensPedido.forEach(async item => {
                const idProduto = item.idProduto;
                const sqlItem = 'INSERT INTO itens_pedido (quantidade, preco_unitario, subTotal,id_pedido, id_produto) VALUES (?, ?, ?, ?, ?);'
                const valuesItem = [item.quantidade, item.precoUnitario, item.subTotal, item.subTotal, idPedido, idProduto];

                const produtoSelecionado = await produtoRepository.selecionarPorId(idProduto);
                const estoqueAtual = produtoSelecionado[0].estoque_produto;
                const novoEstoque = estoqueAtual - item.quantidade;

                const sqlProduto = 'UPDATE produtos SET estoque_produto = ? WHERE id_produto = ?;';
                const valuesProduto = [novoEstoque, idProduto];

                await conn.execute(sqlItem, valuesItem);
                await conn.execute(sqlProduto, valuesProduto);
            });


            const sqlProduto = 'UPDATE produtos SET estoque_produto = ? WHERE id_produto = ?'
            await conn.commit();
            return { rowsPed, rowsItem };
        } catch (error) {
            await conn.rollback();
            throw new Error(error);

        } finally {
            conn.release();
        }
    },
    diminuirEstoque: async (idProduto, quantidade) => {
        const sql = 'UPDATE produtos SET estoque_produto = estoque_produto - ? WHERE id_produto = ? AND estoque_produto >= ?;';
        const [resultado] = await connection.execute(sql, [quantidade, idProduto, quantidade]);
        return resultado ;
    }

}

export default pedidoRepository;