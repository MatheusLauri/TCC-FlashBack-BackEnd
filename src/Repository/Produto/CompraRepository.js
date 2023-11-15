import { con } from "../connection.js";




export async function inserirCartao(cartao){

    const comando = 
    `
    INSERT INTO TB_CARTAO (NR_CARTAO,DT_VALIDADE, NR_CVV) 
                VALUES (?, ?, ?)
    `

    const [resposta] = await con.query(comando,
        
        [
            cartao.Numero,
            cartao.Validade,
            cartao.Cvv
        ])


        cartao.ID = resposta.insertId

        return cartao
}

export async function FormaPagamento(forma){

    const comando = 
    `
    INSERT INTO TB_FORMA_PAGAMENTO (ID_CARTAO) 
	       VALUES (?)
    `

    const [resposta] = await con.query(comando, [forma.FormaDePag])

    forma.ID = resposta.insertId

    return forma
}   




export async function AlterarPedidoIngresso(pedido,id){

    const comando =
    `
        
        UPDATE TB_PEDIDO_INGRESSO SET ID_CLIENTE = ?, ID_INGRESSO = ?, ID_TIPO_INGRESSO = ?, QTD_ITENS = ? 
        WHERE (ID_PEDIDO_INGRESSO = ?)

    `

    const [resposta] = await con.query(comando, 
        [
           pedido.Cliente,
           pedido.Ingresso,
           pedido.Tipo,
           pedido.Qtd,
           id
        ])


    return resposta.affectedRows

}


export async function AlterarPedido(situacao,id){


    const comando = `
        UPDATE TB_PEDIDO SET BT_SITUACAO = ? WHERE (ID_PEDIDO = ?);
    `

    const [resposta] = await con.query(comando,
         [
            situacao.situacao,
            id
        ]) 

    return resposta.affectedRows
}


export async function DeletePedidoIngresso(id){

    const comando1 = 
    `
        DELETE FROM TB_PEDIDO WHERE ID_PEDIDO_INGRESSO = ?

    `

    const comando2 = 
    `
        DELETE FROM TB_PEDIDO_INGRESSO WHERE ID_PEDIDO_INGRESSO = ?
    `

    const [resposta1] = await con.query(comando1,[id])
    const [resposta2] = await con.query(comando2,[id])

    return resposta2.affectedRows
}


export async function DeletePedido(id){
    const comando = 
    `
        DELETE FROM TB_PEDIDO WHERE ID_PEDIDO = ?
    `

    const [resposta] = await con.query(comando, [id])

    return resposta.affectedRows
}

// escolher oque vai selecionar na listagem e nos update