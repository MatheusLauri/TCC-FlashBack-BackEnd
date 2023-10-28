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