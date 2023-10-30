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


export async function PedidoIngresso(pedido){

    const comando = 
    `
        INSERT INTO TB_PEDIDO_INGRESSO (ID_CLIENTE, ID_INGRESSO, ID_TIPO_INGRESSO, QTD_ITENS) 
	           VALUES (?, ?, ?, ?);
    `

    const [resposta] = await con.query(comando, 
        [
            pedido.Cliente,
            pedido.Ingresso,
            pedido.TipoIngresso,
            pedido.Qtd
        ])

    pedido.ID = resposta.insertId

    return pedido
}


export async function Pedido(pedido){
    const comando = 
    `
    INSERT INTO TB_PEDIDO (ID_PEDIDO_INGRESSO, ID_FORMA_PAGAMENTO, DT_PEDIDO, BT_SITUACAO) 
			VALUES (?, ?, now(), ?)

    `

    const [resposta] = await con.query(comando,
        [
            pedido.PedidoIngresso,
            pedido.FormaPagamento,
            pedido.Situacao
        ]
    )
        pedido.ID = resposta.insertId
        
        return pedido
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


export async function ListagemPedidoIngresso(){

    const comando = `
        SELECT *
        FROM TB_PEDIDO_INGRESSO
        INNER JOIN TB_CADASTRO_CLIENTE ON TB_PEDIDO_INGRESSO.ID_CLIENTE = TB_CADASTRO_CLIENTE.ID_CLIENTE
        INNER JOIN TB_INGRESSO ON TB_PEDIDO_INGRESSO.ID_INGRESSO = TB_INGRESSO.ID_INGRESSO
        INNER JOIN TB_TIPOS_INGRESSO ON TB_PEDIDO_INGRESSO.ID_TIPO_INGRESSO = TB_TIPOS_INGRESSO.ID_TIPO_INGRESSO
    `

    const [resposta] = await con.query(comando)

    return resposta
}


export async function ListagemPedido(){


    const comando = 
    `
        SELECT *
    FROM TB_PEDIDO
    INNER JOIN TB_PEDIDO_INGRESSO ON TB_PEDIDO.ID_PEDIDO_INGRESSO = TB_PEDIDO_INGRESSO.ID_PEDIDO_INGRESSO
    INNER JOIN TB_FORMA_PAGAMENTO ON TB_PEDIDO.ID_FORMA_PAGAMENTO = TB_FORMA_PAGAMENTO.ID_FORMA_PAGAMENTO
    `

    const [resposta] = await con.query(comando)
    return resposta

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