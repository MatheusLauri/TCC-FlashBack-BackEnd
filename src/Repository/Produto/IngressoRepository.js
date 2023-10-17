
import { con } from "../connection.js";



export async function inserirIngresso(ingresso){
    
    const comando = 
    `
    INSERT INTO TB_INGRESSO(ID_CATEGORIA_INGRESSO, ID_EMPRESA, NM_EVENTO, DS_EVENTO, DT_COMECO, DT_FIM, DT_CADASTRO, BT_DESTAQUE)
	        VALUES (?, ?, ?, ?, ?, ?, now(), ?)
    `

    const [resposta] = await con.query (comando, 
        
        [
            ingresso.Categoria,
            ingresso.Empresa,
            ingresso.NomeEvento,
            ingresso.Descricao,
            ingresso.DataComeco,
            ingresso.DataFim,
            ingresso.Destaque
        ] 
    )

    ingresso.ID = resposta.insertId;

    return ingresso;
}



export async function ListarIngressos(){

    const comando = `
    SELECT  NM_CATEGORIA_INGRESSO,
		NM_TIPO_INGRESSO, 
        QTD_TIPO_INGRESSO, 
        VL_PRECO_TIPO, 
        NM_EVENTO, 
        DT_COMECO,
        DT_FIM,
        DS_EVENTO,
        IMAGEM_INGRESSO,
        DT_CADASTRO,
        BT_DESTAQUE
        
	FROM 			TB_INGRESSO						INGRESSO
	INNER JOIN 		TB_CATEGORIA_INGRESSO 	 		CATEGORIA		ON CATEGORIA.ID_CATEGORIA_INGRESSO = INGRESSO.ID_CATEGORIA_INGRESSO
    INNER JOIN 		TB_TIPOS_INGRESSO   			TIPO 			ON TIPO.ID_INGRESSO = INGRESSO.ID_INGRESSO
	ORDER BY  	NM_CATEGORIA_INGRESSO, NM_TIPO_INGRESSO  `

    const [resposta] = await con.query(comando)

    return resposta
}


export async function buscarIngressosCategoria (categoria) {

    const comando = `
    SELECT  NM_CATEGORIA_INGRESSO, 
            NM_EVENTO, 
            DT_COMECO,
            DS_EVENTO,
            IMAGEM_INGRESSO
    
        FROM 			TB_INGRESSO						INGRESSO
        INNER JOIN 		TB_CATEGORIA_INGRESSO 	 		CATEGORIA		ON CATEGORIA.ID_CATEGORIA_INGRESSO = INGRESSO.ID_CATEGORIA_INGRESSO
        WHERE NM_CATEGORIA_INGRESSO LIKE ?
    `

    const [resposta] = await con.query(comando, [`%${categoria}%`])

    return resposta
}



export async function AlterarCapaIngresso (imagem, id) {

    const comando = 
    `   UPDATE TB_INGRESSO
            SET IMAGEM_INGRESSO     = ?
            WHERE ID_INGRESSO       = ?`

    const [resposta] = await con.query(comando, [imagem, id])
    return resposta.affectedRows
}



export async function alterarIngresso(id, ingresso){

    const comando = 
        `UPDATE TB_INGRESSO
                SET ID_CATEGORIA_INGRESSO   = ?, 
                    ID_EMPRESA              = ?, 
                    NM_EVENTO               = ?, 
                    DS_EVENTO               = ?, 
                    DT_COMECO               = ?, 
                    DT_FIM                  = ?, 
                    BT_DESTAQUE             = ?
                WHERE   ID_INGRESSO = ?`

    const [resposta] = await con.query(comando, 
        
        [
            ingresso.Categoria,
            ingresso.Empresa,
            ingresso.NomeEvento,
            ingresso.Descricao,
            ingresso.DataComeco,
            ingresso.DataFim,
            ingresso.Destaque,
            id
        ]

    )
    
    return resposta.affectedRows
}



export async function removerIngresso(id){

    const comando = 
    ` DELETE FROM   TB_PEDIDO
            WHERE   ID_PEDIDO_INGRESSO = ?`

    const comando2 = 
    ` DELETE FROM   TB_PEDIDO_INGRESSO
            WHERE   ID_TIPO_INGRESSO = ?`

    const comando3 = 
    ` DELETE FROM   TB_TIPOS_INGRESSO 
             WHERE  ID_INGRESSO = ?
    `

    const comando4 = 
    ` DELETE FROM   TB_INGRESSO
            WHERE   ID_INGRESSO = ?`

    const [resposta] = await con.query(comando, [id])
    const [resposta2] = await con.query(comando2, [id])
    const [resposta3] = await con.query(comando3, [id])
    const [resposta4] = await con.query(comando4, [id])

    return resposta4.affectedRows

}


export async function inserirIngressocomImagem(ingresso){
    
    const comando = 
    `
    INSERT INTO TB_INGRESSO(ID_CATEGORIA_INGRESSO, ID_EMPRESA, NM_EVENTO, DS_EVENTO, DT_COMECO, DT_FIM, DT_CADASTRO, BT_DESTAQUE)
	        VALUES (?, ?, ?, ?, ?, ?, now(), ?)
    `

    const [resposta] = await con.query (comando, 
        
        [
            ingresso.Categoria,
            ingresso.Empresa,
            ingresso.NomeEvento,
            ingresso.Descricao,
            ingresso.DataComeco,
            ingresso.DataFim,
            ingresso.Destaque
        ] 
    )

    ingresso.ID = resposta.insertId;

    return ingresso;
}


export async function BuscarNomeIngresso(nome){

    const comando = 
        `
        SELECT  
                NM_EVENTO, 
                DT_COMECO,
                DS_EVENTO,
                IMAGEM_INGRESSO
                
                
        FROM 			TB_INGRESSO						INGRESSO
        INNER JOIN 		TB_CATEGORIA_INGRESSO 	 		CATEGORIA		ON CATEGORIA.ID_CATEGORIA_INGRESSO = INGRESSO.ID_CATEGORIA_INGRESSO
        WHERE   NM_EVENTO LIKE ? OR  NM_CATEGORIA_INGRESSO LIKE ?

        `


    const [linhas] = await con.query(comando, [ `%${nome}%`, `%${nome}%` ])

    return linhas
}