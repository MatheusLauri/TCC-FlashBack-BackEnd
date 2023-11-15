import { con } from "../connection.js";

export async function login(email, senha){

    const comando = 
    `   SELECT  DS_EMAIL_ADM,      
                DS_SENHA_ADM     
        FROM    TB_CADASTRO_ADM 
        WHERE   DS_EMAIL_ADM    = ?
        AND     DS_SENHA_ADM    = ?`
    
    const [resposta] = await con.query(comando, [email, senha])
    return resposta[0]
}

export async function ListarEmpresa(){

    const comando = `
    SELECT ID_EMPRESA, DS_CNPJ, NM_RAZAO_SOCIAL, DS_EMAIL_EMPRESA, DS_SENHA_EMPRESA FROM TB_CADASTRO_EMPRESA
    `

    const [resposta] = await con.query(comando)

    return resposta
}


export async function ListarClientes(){

    const comando = `SELECT ID_CLIENTE, NM_CLIENTE, NM_SOBRENOME, DS_CPF, DT_NASCIMENTO, DS_TELEFONE, NM_USUARIO, DS_EMAIL, DS_SENHA, DT_CADASTRO FROM TB_CADASTRO_CLIENTE
    `

    const [resposta] = await con.query(comando)

    return resposta
}



export async function ListarCompraUF(UF){
    const comando = 
    `
    SELECT  ID_PEDIDO,
			NM_CLIENTE,
            NM_SOBRENOME,
            DS_CPF,
            DS_EMAIL,
            DS_TELEFONE,
			NM_EVENTO,
            DS_UF,
            IMAGEM_INGRESSO,
			DS_EVENTO,
            NM_TIPO_INGRESSO,
            VL_PRECO_TIPO,
            QTD_ITENS,
            DT_PEDIDO
            
	FROM 			TB_PEDIDO						PEDIDO
	INNER JOIN 		TB_PEDIDO_INGRESSO 	 		    PDINGRESSO				ON PDINGRESSO.ID_PEDIDO_INGRESSO = PEDIDO.ID_PEDIDO_INGRESSO
	INNER JOIN 		TB_CADASTRO_CLIENTE 	 		CLIENTE					ON CLIENTE.ID_CLIENTE = PDINGRESSO.ID_CLIENTE
    INNER JOIN 		TB_INGRESSO 	 				INGRESSO				ON INGRESSO.ID_INGRESSO = PDINGRESSO.ID_INGRESSO
    INNER JOIN		TB_LOCAL_EVENTO					LOCAL					ON LOCAL.ID_LOCAL_EVENTO = INGRESSO.ID_LOCAL_EVENTO
	INNER JOIN 		TB_TIPOS_INGRESSO 	 			TIPO					ON TIPO.ID_TIPO_INGRESSO = PDINGRESSO.ID_TIPO_INGRESSO
    INNER JOIN 		TB_FORMA_PAGAMENTO   			FORMA_PAGAMENTO			ON FORMA_PAGAMENTO.ID_FORMA_PAGAMENTO = PEDIDO.ID_FORMA_PAGAMENTO
 
   WHERE DS_UF = ?
    `


    const [resposta] =  await con.query(comando, UF)

    return resposta
}


export async function TodasCompras(){
    const comando = 
    `
   
    SELECT 
        P.*, 
        PI.*,
        FP.*
    FROM 
    TB_PEDIDO P
    INNER JOIN TB_PEDIDO_INGRESSO PI ON P.ID_PEDIDO_INGRESSO = PI.ID_PEDIDO_INGRESSO
    INNER JOIN TB_FORMA_PAGAMENTO FP ON P.ID_FORMA_PAGAMENTO = FP.ID_FORMA_PAGAMENTO
    `


    const [resposta] = await con.query(comando)


    return resposta
}


export async function CompraPorData(data){
    

    const comando = `
    SELECT 
    P.*, 
    PI.*,
    FP.*
    FROM 
        TB_PEDIDO P
        INNER JOIN TB_PEDIDO_INGRESSO PI ON P.ID_PEDIDO_INGRESSO = PI.ID_PEDIDO_INGRESSO
        INNER JOIN TB_FORMA_PAGAMENTO FP ON P.ID_FORMA_PAGAMENTO = FP.ID_FORMA_PAGAMENTO
    WHERE 
        P.DT_PEDIDO LIKE '?%'
    `

    const [resposta] = await con.query(comando, data.data)
    
    return resposta
}


export async function compraPorCategoria(categoria){

    const comando = `

    SELECT  PEDIDO.ID_PEDIDO,
    PEDIDO.ID_PEDIDO_INGRESSO,
    PEDIDO.ID_FORMA_PAGAMENTO,
    PEDIDO.DT_PEDIDO,
    PEDIDO.BT_SITUACAO,
    PDINGRESSO.ID_CLIENTE,
    PDINGRESSO.ID_INGRESSO,
    PDINGRESSO.ID_TIPO_INGRESSO,
    PDINGRESSO.QTD_ITENS,
    CLIENTE.NM_CLIENTE,
    CLIENTE.NM_SOBRENOME,
    CLIENTE.NM_USUARIO,
    INGRESSO.ID_CATEGORIA_INGRESSO,
    INGRESSO.ID_EMPRESA,
    INGRESSO.NM_EVENTO,
    INGRESSO.IMAGEM_INGRESSO,
    INGRESSO.DT_CADASTRO,
    INGRESSO.BT_DESTAQUE,
    DATAS.DT_INGRESSO,
    HORARIOS.DS_HORARIO,
    TIPO.NM_TIPO_INGRESSO,
    TIPO.QTD_TIPO_INGRESSO,
    TIPO.VL_PRECO_TIPO

        
    FROM 			TB_PEDIDO					PEDIDO
    INNER JOIN 		TB_PEDIDO_INGRESSO 	 		PDINGRESSO				ON PDINGRESSO.ID_PEDIDO_INGRESSO = PEDIDO.ID_PEDIDO_INGRESSO
    INNER JOIN 		TB_CADASTRO_CLIENTE 		CLIENTE					ON CLIENTE.ID_CLIENTE = PDINGRESSO.ID_CLIENTE
    INNER JOIN 		TB_INGRESSO 	 			INGRESSO				ON INGRESSO.ID_INGRESSO = PDINGRESSO.ID_INGRESSO
    INNER JOIN 		TB_TIPOS_INGRESSO 	 		TIPO					ON TIPO.ID_TIPO_INGRESSO = PDINGRESSO.ID_TIPO_INGRESSO
    INNER JOIN		TB_DATAS_INGRESSO			DATAS					ON DATAS.ID_INGRESSO = INGRESSO.ID_INGRESSO
    INNER JOIN		TB_HORARIOS_DATAS_INGRESSO	HORARIOS				ON HORARIOS.ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO
    WHERE ID_CATEGORIA_INGRESSO = ?
    
    `

    const [resposta] = await con.query(comando, categoria)

 
    return resposta
}




export async function PostApi(cnpj,razao,email,senha){

    const comando = `
    INSERT INTO TB_CADASTRO_EMPRESA (DS_CNPJ, NM_RAZAO_SOCIAL, DS_EMAIL_EMPRESA, DS_SENHA_EMPRESA) 
                VALUES (?, ?, ?, ?)

    `

    const [resposta] = await con.query(comando,[cnpj,razao,email,senha])


    return resposta.affectedRows
}


