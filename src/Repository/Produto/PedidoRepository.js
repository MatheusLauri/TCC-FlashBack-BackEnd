import { con } from "../connection.js";



export async function InserirPedidoIngresso(pedido){

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


export async function InserirPedido(pedido){

    const comando = 
    `
    INSERT INTO tb_pedido (ID_PEDIDO_INGRESSO, ID_FORMA_PAGAMENTO, DT_PEDIDO, BT_SITUACAO) 
           VALUES (?, ?, now(), ?)
    `

    const [resposta] = await con.query(comando, 
    [
        pedido.PedidoIngresso,
        pedido.FormaPagamento,
        pedido.Situacao
    ])

    pedido.id = resposta.insertId

    return pedido
}




export async function ListarPedido(){
    const comando = `
    SELECT  	ID_PEDIDO,
                NM_CLIENTE,
                NM_SOBRENOME,
                DS_CPF,
                DS_EMAIL,
                DS_TELEFONE,
                NM_EVENTO, 
                DT_INGRESSO,
                DS_HORARIO,
                IMAGEM_INGRESSO,
                DS_EVENTO,
                NM_TIPO_INGRESSO,
                VL_PRECO_TIPO,
                QTD_ITENS,
                DT_PEDIDO
    
        FROM 			TB_PEDIDO						PEDIDO
        INNER JOIN 		TB_PEDIDO_INGRESSO 	 			PDINGRESSO				ON 		PDINGRESSO.ID_PEDIDO_INGRESSO = PEDIDO.ID_PEDIDO_INGRESSO
        INNER JOIN 		TB_CADASTRO_CLIENTE 			CLIENTE					ON 		CLIENTE.ID_CLIENTE = PDINGRESSO.ID_CLIENTE
        INNER JOIN 		TB_INGRESSO 	 				INGRESSO				ON 		INGRESSO.ID_INGRESSO = PDINGRESSO.ID_INGRESSO
        INNER JOIN 		TB_TIPOS_INGRESSO 	 			TIPO					ON 		TIPO.ID_TIPO_INGRESSO = PDINGRESSO.ID_TIPO_INGRESSO
        INNER JOIN 		TB_FORMA_PAGAMENTO   			FORMA_PAGAMENTO			ON 		FORMA_PAGAMENTO.ID_FORMA_PAGAMENTO = PEDIDO.ID_FORMA_PAGAMENTO
        INNER JOIN		TB_DATAS_INGRESSO				DATAS					ON 		PDINGRESSO.ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO
        INNER JOIN		TB_HORARIOS_DATAS_INGRESSO		HORARIOS				ON 		PDINGRESSO.ID_HORARIO_INGRESSO = HORARIOS.ID_HORARIO_INGRESSO
    `

    const [resposta] = await con.query(comando)

    return resposta
}


export async function ListarPedidoIngresso(){
    const comando = 
    `
    SELECT 		ID_PEDIDO_INGRESSO,
                ID_CLIENTE,
                INGRESSO.ID_INGRESSO,
                TIPOS.ID_TIPO_INGRESSO,
                ID_CATEGORIA_INGRESSO,
                ID_EMPRESA,
                LOCAL.ID_LOCAL_EVENTO,
                DATAS.ID_DATA_INGRESSO,
                HORARIOS.ID_HORARIO_INGRESSO,
                NM_EVENTO,
                DT_INGRESSO,
                DS_HORARIO,
                DS_EVENTO,
                IMAGEM_INGRESSO,
                DT_CADASTRO,
                QTD_ITENS,
                NM_TIPO_INGRESSO,
                QTD_TIPO_INGRESSO,
                VL_PRECO_TIPO,
                BT_DESTAQUE

        FROM 				TB_PEDIDO_INGRESSO  		PEDIDO_INGRESSO

        INNER JOIN 			TB_TIPOS_INGRESSO 				TIPOS 			ON 		PEDIDO_INGRESSO.ID_TIPO_INGRESSO = TIPOS.ID_TIPO_INGRESSO
        INNER JOIN 			TB_INGRESSO 					INGRESSO 		ON 		PEDIDO_INGRESSO.ID_INGRESSO = INGRESSO.ID_INGRESSO
        INNER JOIN			TB_LOCAL_EVENTO					LOCAL			ON 		LOCAL.ID_LOCAL_EVENTO = LOCAL.ID_LOCAL_EVENTO
        INNER JOIN			TB_DATAS_INGRESSO				DATAS			ON 		PEDIDO_INGRESSO.ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO
        INNER JOIN			TB_HORARIOS_DATAS_INGRESSO		HORARIOS		ON 		PEDIDO_INGRESSO.ID_HORARIO_INGRESSO = HORARIOS.ID_HORARIO_INGRESSO

        GROUP BY 	ID_PEDIDO_INGRESSO, ID_CLIENTE, INGRESSO.ID_INGRESSO, TIPOS.ID_TIPO_INGRESSO,ID_CATEGORIA_INGRESSO, ID_EMPRESA, LOCAL.ID_LOCAL_EVENTO, DATAS.ID_DATA_INGRESSO,
                    HORARIOS.ID_HORARIO_INGRESSO, NM_EVENTO, DATAS.DT_INGRESSO, HORARIOS.DS_HORARIO, DS_EVENTO, IMAGEM_INGRESSO, DT_CADASTRO, QTD_ITENS,NM_TIPO_INGRESSO,
                    QTD_TIPO_INGRESSO,VL_PRECO_TIPO,BT_DESTAQUE
    `
    

    const [resposta] = await con.query(comando)

    return resposta
}


export async function DeletarPedido(id){
    const comando = 
    `
        DELETE FROM TB_PEDIDO 
                    WHERE ID_PEDIDO = ?
    `

    const [resposta] = await con.query(comando,[id])

    return resposta.affectedRows
}



export async function DeletarPedidoIngresso(id){

    const comando1 = 
    `
    
        DELETE FROM TB_PEDIDO 
                    WHERE ID_PEDIDO_INGRESSO = ?

    `


    const comando2 = 
    `

        DELETE FROM TB_PEDIDO_INGRESSO 
                    WHERE ID_PEDIDO_INGRESSO = ?

    `

    const [resposta1] = await con.query(comando1, [id])
    const [resposta2] = await con.query(comando2, [id])

    return resposta2.affectedRows
}


export async function AdicionarQtdItens(adicionar,id){ 


    const comando = 
    
    `
    UPDATE TB_PEDIDO_INGRESSO 
           SET QTD_ITENS = ? 
                WHERE (ID_PEDIDO_INGRESSO = ?)
    `

    const [resposta] =  await con.query(comando,
         [
            adicionar.Qtd,
            id
         ])

    return resposta
}


export async function TransferirIngresso (email , pedidoIngresso){

    const comando1 = 
    
    `
    SELECT ID_CLIENTE as Cliente,
    DS_EMAIL
    FROM TB_CADASTRO_CLIENTE
    WHERE DS_EMAIL = ?

    `

    const [resposta1] = await con.query(comando1, email)

    console.log(resposta1)

    const comando = 
    `
        UPDATE TB_PEDIDO_INGRESSO SET ID_CLIENTE = ? WHERE ID_PEDIDO_INGRESSO = ?
    `

    const [resposta] = await con.query(comando,
         [
            resposta1[0].Cliente,
            pedidoIngresso
         ])

         
    return resposta
}