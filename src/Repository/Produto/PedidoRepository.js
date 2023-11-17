import { con } from "../connection.js";



export async function InserirPedidoIngresso(pedidoIngresso){

    const comando = `
    
        INSERT INTO TB_PEDIDO_INGRESSO(ID_CLIENTE, ID_CATEGORIA_INGRESSO, ID_LOCAL_EVENTO, ID_INGRESSO, ID_DATA_INGRESSO, ID_HORARIO_INGRESSO, ID_TIPO_INGRESSO, QTD_ITENS)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
    `

    const [resposta] = await con.query(comando, 
        [
            pedidoIngresso.Cliente,
            pedidoIngresso.Categoria, 
            pedidoIngresso.Local,
            pedidoIngresso.Ingresso,
            pedidoIngresso.Data,
            pedidoIngresso.Horario,
            pedidoIngresso.TipoIngresso,
            pedidoIngresso.Itens
        ])

    pedidoIngresso.ID = resposta.insertId


    return pedidoIngresso
}


export async function InserirPedido(pedido){

    const comando = 
    `
    INSERT INTO tb_pedido (ID_PEDIDO_INGRESSO, ID_FORMA_PAGAMENTO, DT_PEDIDO, BT_SITUACAO) 
           VALUES (?, ?, now(), true)
    `

    const [resposta] = await con.query(comando, 
    [
        pedido.PedidoIngresso,
        pedido.FormaPagamento
    ])

    pedido.id = resposta.insertId

    return pedido
}




export async function ListarPedido(id){
        const comando = `
    
        SELECT  	
        INGRESSO.IMAGEM_INGRESSO,
        INGRESSO.NM_EVENTO,
        LOCAL.DS_CEP,
        LOCAL.DS_LOGRADOURO,
        LOCAL.DS_BAIRRO,
        LOCAL.DS_LOCALIDADE,
        LOCAL.DS_UF,
        LOCAL.DS_NUM,
        DATAS.DT_INGRESSO,
        PEDIDO.BT_SITUACAO
        
    FROM 			TB_PEDIDO						PEDIDO
    INNER JOIN 		TB_PEDIDO_INGRESSO 	 		    PDINGRESSO				ON PDINGRESSO.ID_PEDIDO_INGRESSO = PEDIDO.ID_PEDIDO_INGRESSO
    INNER JOIN 		TB_CADASTRO_CLIENTE 	 		CLIENTE					ON CLIENTE.ID_CLIENTE = PDINGRESSO.ID_CLIENTE
    INNER JOIN 		TB_INGRESSO 	 				INGRESSO				ON INGRESSO.ID_INGRESSO = PDINGRESSO.ID_INGRESSO
    INNER JOIN		TB_LOCAL_EVENTO					LOCAL					ON LOCAL.ID_LOCAL_EVENTO = INGRESSO.ID_LOCAL_EVENTO
    INNER JOIN 		TB_TIPOS_INGRESSO 	 			TIPO					ON TIPO.ID_TIPO_INGRESSO = PDINGRESSO.ID_TIPO_INGRESSO
    INNER JOIN 		TB_FORMA_PAGAMENTO   			FORMA_PAGAMENTO			ON FORMA_PAGAMENTO.ID_FORMA_PAGAMENTO = PEDIDO.ID_FORMA_PAGAMENTO
    INNER JOIN		TB_DATAS_INGRESSO				DATAS					ON DATAS.ID_INGRESSO = INGRESSO.ID_INGRESSO
    WHERE PDINGRESSO.ID_CLIENTE = 
    ORDER BY PEDIDO.DT_PEDIDO DESC;
    `

    const [resposta] = await con.query(comando,id)

    return resposta
}


export async function ListarPedidoIngresso(){
    const comando = 
    `
    SELECT 		ID_PEDIDO_INGRESSO,
                ID_CLIENTE,
                INGRESSO.ID_INGRESSO,
                TIPOS.ID_TIPO_INGRESSO,
                CATEGORIA.ID_CATEGORIA_INGRESSO,
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
                VL_PRECO_TIPO,
                BT_DESTAQUE

        FROM 				TB_PEDIDO_INGRESSO  			PEDIDO_INGRESSO

        INNER JOIN 			TB_TIPOS_INGRESSO 				TIPOS 			ON 		PEDIDO_INGRESSO.ID_TIPO_INGRESSO = TIPOS.ID_TIPO_INGRESSO
        INNER JOIN 			TB_CATEGORIA_INGRESSO 	 		CATEGORIA		ON 		PEDIDO_INGRESSO.ID_CATEGORIA_INGRESSO = CATEGORIA.ID_CATEGORIA_INGRESSO
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


export async function TransferirIngresso (email ,ClienteAntigo, pedidoIngresso){

    const comando1 = 
    
    `
    SELECT ID_CLIENTE as Cliente,
    DS_EMAIL
    FROM TB_CADASTRO_CLIENTE
    WHERE DS_EMAIL = ?

    `

    const [resposta1] = await con.query(comando1, email)


    const comando = 
    `
        UPDATE TB_PEDIDO P
        JOIN TB_PEDIDO_INGRESSO PDI ON PDI.ID_PEDIDO_INGRESSO = P.ID_PEDIDO_INGRESSO
        JOIN TB_CADASTRO_CLIENTE CLI ON CLI.ID_CLIENTE = PDI.ID_CLIENTE
        SET PDI.ID_CLIENTE = ?
        WHERE CLI.ID_CLIENTE = ? AND P.ID_PEDIDO = ?
    `

    const [resposta] = await con.query(comando,
         [
            resposta1[0].Cliente,
            ClienteAntigo,
            pedidoIngresso
         ])

    
    return resposta
}



export async function ListarTudo(){
    const comando = `
    SELECT  	*
            
	FROM 			TB_PEDIDO						PEDIDO
	INNER JOIN 		TB_PEDIDO_INGRESSO 	 		    PDINGRESSO				ON PDINGRESSO.ID_PEDIDO_INGRESSO = PEDIDO.ID_PEDIDO_INGRESSO
	INNER JOIN 		TB_CADASTRO_CLIENTE 	 		CLIENTE					ON CLIENTE.ID_CLIENTE = PDINGRESSO.ID_CLIENTE
    INNER JOIN 		TB_INGRESSO 	 				INGRESSO				ON INGRESSO.ID_INGRESSO = PDINGRESSO.ID_INGRESSO
    INNER JOIN 		TB_CADASTRO_EMPRESA				EMPRESA					ON EMPRESA.ID_EMPRESA = INGRESSO.ID_EMPRESA
    INNER JOIN 		TB_CATEGORIA_INGRESSO 	 		CATEGORIA				ON CATEGORIA.ID_CATEGORIA_INGRESSO = INGRESSO.ID_CATEGORIA_INGRESSO
    INNER JOIN		TB_LOCAL_EVENTO					LOCAL					ON LOCAL.ID_LOCAL_EVENTO = INGRESSO.ID_LOCAL_EVENTO
	INNER JOIN 		TB_TIPOS_INGRESSO 	 			TIPO					ON TIPO.ID_TIPO_INGRESSO = PDINGRESSO.ID_TIPO_INGRESSO
    INNER JOIN 		TB_FORMA_PAGAMENTO   			FORMA_PAGAMENTO			ON FORMA_PAGAMENTO.ID_FORMA_PAGAMENTO = PEDIDO.ID_FORMA_PAGAMENTO
	INNER JOIN		TB_DATAS_INGRESSO				DATAS					ON DATAS.ID_INGRESSO = INGRESSO.ID_INGRESSO
    ORDER BY PEDIDO.DT_pedido DESC
        
    `

    const [resposta] = await con.query(comando)

    return resposta
}







