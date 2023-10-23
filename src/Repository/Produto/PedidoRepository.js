import { con } from "../connection.js";



export async function InserirPedido(pedido){

    const comando = `
    
        INSERT INTO TB_PEDIDO_INGRESSO(ID_CLIENTE, ID_INGRESSO, ID_TIPO_INGRESSO, QTD_ITENS)
               VALUES (?, ?, ?, ?) 
    `

    const [resposta] = await con.query(comando, 
        [
            pedido.Cliente, 
            pedido.Ingresso,
            pedido.TipoIngresso,
            pedido.Itens
        ])

    pedido.ID = resposta.insertId


    return pedido
}

