
import { con } from "../connection.js";



export async function inserirIngresso(ingresso){
    
    const comando = 
    `
    INSERT INTO TB_INGRESSO(ID_CATEGORIA_INGRESSO, ID_EMPRESA, ID_LOCAL_EVENTO, NM_EVENTO, DS_EVENTO, DT_CADASTRO, BT_DESTAQUE)
	        VALUES (?, ?, ?, ?, ?, now(), ?)
    `

    const [resposta] = await con.query (comando, 
        
        [
            ingresso.Categoria,
            ingresso.Empresa,
            ingresso.Local,
            ingresso.NomeEvento,
            ingresso.Descricao,
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
            MIN(DT_INGRESSO) AS DT_COMECO,
            MAX(DT_INGRESSO) AS DT_FIM,
            DS_HORARIO,
            DS_LOGRADOURO,
            DS_LOCALIDADE,
            DS_UF,
            DS_EVENTO,
            IMAGEM_INGRESSO,
            DT_CADASTRO,
            BT_DESTAQUE
        
        FROM 			TB_INGRESSO						INGRESSO
        INNER JOIN 		TB_CATEGORIA_INGRESSO 	 		CATEGORIA		ON CATEGORIA.ID_CATEGORIA_INGRESSO = INGRESSO.ID_CATEGORIA_INGRESSO
        INNER JOIN 		TB_TIPOS_INGRESSO   			TIPO 			ON TIPO.ID_INGRESSO = INGRESSO.ID_INGRESSO
        INNER JOIN		TB_LOCAL_EVENTO					LOCAL			ON LOCAL.ID_LOCAL_EVENTO = INGRESSO.ID_LOCAL_EVENTO
        INNER JOIN		TB_DATAS_INGRESSO				DATAS			ON DATAS.ID_INGRESSO = INGRESSO.ID_INGRESSO
        INNER JOIN		TB_HORARIOS_DATAS_INGRESSO		HORARIOS		ON HORARIOS.ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO
        
        WHERE DT_INGRESSO = (SELECT MIN(DT_INGRESSO) FROM TB_DATAS_INGRESSO WHERE ID_INGRESSO = INGRESSO.ID_INGRESSO) 
        AND DS_HORARIO= (SELECT MIN(DS_HORARIO) FROM TB_HORARIOS_DATAS_INGRESSO WHERE ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO)
        
        GROUP BY
        NM_CATEGORIA_INGRESSO, NM_TIPO_INGRESSO, QTD_TIPO_INGRESSO, VL_PRECO_TIPO, NM_EVENTO, DS_HORARIO, DS_LOGRADOURO, DS_LOCALIDADE, DS_UF, DS_EVENTO, IMAGEM_INGRESSO, DT_CADASTRO, BT_DESTAQUE

        ORDER BY  	NM_CATEGORIA_INGRESSO, NM_TIPO_INGRESSO  `

    const [resposta] = await con.query(comando)

    return resposta
}

export async function ListarIngressosDestaque(){

    const comando = `
    SELECT  INGRESSO.ID_INGRESSO,
            NM_CATEGORIA_INGRESSO,
            NM_TIPO_INGRESSO, 
            QTD_TIPO_INGRESSO, 
            VL_PRECO_TIPO, 
            NM_EVENTO, 
            MIN(DT_INGRESSO) AS DT_COMECO,
            MAX(DT_INGRESSO) AS DT_FIM,
            DS_HORARIO,
            DS_LOGRADOURO,
            DS_LOCALIDADE,
            DS_UF,
            DS_EVENTO,
            IMAGEM_INGRESSO,
            DT_CADASTRO,
            BT_DESTAQUE

        FROM 			TB_INGRESSO						INGRESSO
        INNER JOIN 		TB_CATEGORIA_INGRESSO 	 		CATEGORIA		ON CATEGORIA.ID_CATEGORIA_INGRESSO = INGRESSO.ID_CATEGORIA_INGRESSO
        INNER JOIN 		TB_TIPOS_INGRESSO   			TIPO 			ON TIPO.ID_INGRESSO = INGRESSO.ID_INGRESSO
        INNER JOIN		TB_LOCAL_EVENTO					LOCAL			ON LOCAL.ID_LOCAL_EVENTO = INGRESSO.ID_LOCAL_EVENTO
        INNER JOIN		TB_DATAS_INGRESSO				DATAS			ON DATAS.ID_INGRESSO = INGRESSO.ID_INGRESSO
        INNER JOIN		TB_HORARIOS_DATAS_INGRESSO		HORARIOS		ON HORARIOS.ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO

        WHERE 			INGRESSO.BT_DESTAQUE = 1 
        AND DT_INGRESSO = (SELECT MIN(DT_INGRESSO) FROM TB_DATAS_INGRESSO WHERE ID_INGRESSO = INGRESSO.ID_INGRESSO) 
        AND DS_HORARIO= (SELECT MIN(DS_HORARIO) FROM TB_HORARIOS_DATAS_INGRESSO WHERE ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO)

        GROUP BY
        INGRESSO.ID_INGRESSO, NM_CATEGORIA_INGRESSO, NM_TIPO_INGRESSO, QTD_TIPO_INGRESSO, VL_PRECO_TIPO, NM_EVENTO, DS_HORARIO, DS_LOGRADOURO, DS_LOCALIDADE, DS_UF, DS_EVENTO, IMAGEM_INGRESSO, DT_CADASTRO, BT_DESTAQUE

        ORDER BY NM_EVENTO ASC  `

    const [resposta] = await con.query(comando)

    return resposta
}


export async function buscarIngressosCategoria (categoria) {

    const comando = `
    SELECT  NM_CATEGORIA_INGRESSO, 
            NM_EVENTO, 
            MIN(DT_INGRESSO) AS DT_COMECO,
            MAX(DT_INGRESSO) AS DT_FIM,
            DS_HORARIO,
            DS_LOGRADOURO,
            DS_LOCALIDADE,
            DS_UF,
            DS_NUM,
            INGRESSO.ID_INGRESSO,
            DS_EVENTO,
            IMAGEM_INGRESSO

        FROM 			TB_INGRESSO						INGRESSO
        INNER JOIN 		TB_CATEGORIA_INGRESSO 	 		CATEGORIA		ON CATEGORIA.ID_CATEGORIA_INGRESSO = INGRESSO.ID_CATEGORIA_INGRESSO
        INNER JOIN		TB_LOCAL_EVENTO					LOCAL			ON LOCAL.ID_LOCAL_EVENTO = INGRESSO.ID_LOCAL_EVENTO
        INNER JOIN		TB_DATAS_INGRESSO				DATAS			ON DATAS.ID_INGRESSO = INGRESSO.ID_INGRESSO
        INNER JOIN		TB_HORARIOS_DATAS_INGRESSO		HORARIOS		ON HORARIOS.ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO

        WHERE DT_INGRESSO = (SELECT MIN(DT_INGRESSO) FROM TB_DATAS_INGRESSO WHERE ID_INGRESSO = INGRESSO.ID_INGRESSO) 
        AND DS_HORARIO= (SELECT MIN(DS_HORARIO) FROM TB_HORARIOS_DATAS_INGRESSO WHERE ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO)
        AND NM_CATEGORIA_INGRESSO LIKE ?

        GROUP BY
        NM_CATEGORIA_INGRESSO, NM_EVENTO, DS_HORARIO, DS_LOGRADOURO, DS_LOCALIDADE, DS_UF, DS_NUM, DS_EVENTO, INGRESSO.ID_INGRESSO, IMAGEM_INGRESSO, DT_CADASTRO, BT_DESTAQUE;

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
                    ID_LOCAL_EVENTO         = ?, 
                    NM_EVENTO               = ?, 
                    DS_EVENTO               = ?, 
                    BT_DESTAQUE             = ?
                WHERE   ID_INGRESSO = ?`

    const [resposta] = await con.query(comando, 
        
        [
            ingresso.Categoria,
            ingresso.Local,
            ingresso.NomeEvento,
            ingresso.Descricao,
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


/*export async function inserirIngressocomImagemTeste(ingresso){
    
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
}*/


export async function BuscarNomeIngresso(nome){

    const comando = 
        `
        SELECT  INGRESSO.ID_INGRESSO,
                NM_CATEGORIA_INGRESSO,
                NM_TIPO_INGRESSO, 
                QTD_TIPO_INGRESSO, 
                VL_PRECO_TIPO, 
                NM_EVENTO, 
                MIN(DT_INGRESSO) AS DT_COMECO,
                MAX(DT_INGRESSO) AS DT_FIM,
                DS_HORARIO,
                DS_LOGRADOURO,
                DS_LOCALIDADE,
                DS_UF,
                DS_NUM,
                DS_EVENTO,
                IMAGEM_INGRESSO,
                DT_CADASTRO,
                BT_DESTAQUE
                
        FROM 			TB_INGRESSO						INGRESSO
        INNER JOIN 		TB_CATEGORIA_INGRESSO 	 		CATEGORIA		ON CATEGORIA.ID_CATEGORIA_INGRESSO = INGRESSO.ID_CATEGORIA_INGRESSO
        INNER JOIN 		TB_TIPOS_INGRESSO   			TIPO 			ON TIPO.ID_INGRESSO = INGRESSO.ID_INGRESSO
        INNER JOIN		TB_LOCAL_EVENTO					LOCAL			ON LOCAL.ID_LOCAL_EVENTO = INGRESSO.ID_LOCAL_EVENTO
        INNER JOIN		TB_DATAS_INGRESSO				DATAS			ON DATAS.ID_INGRESSO = INGRESSO.ID_INGRESSO
        INNER JOIN		TB_HORARIOS_DATAS_INGRESSO		HORARIOS		ON HORARIOS.ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO
        
        WHERE   (NM_EVENTO LIKE ?  OR  NM_CATEGORIA_INGRESSO LIKE ?) 
        AND DT_INGRESSO = (SELECT MIN(DT_INGRESSO) FROM TB_DATAS_INGRESSO WHERE ID_INGRESSO = INGRESSO.ID_INGRESSO) 
        AND DS_HORARIO= (SELECT MIN(DS_HORARIO) FROM TB_HORARIOS_DATAS_INGRESSO WHERE ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO)
        
        GROUP BY
        INGRESSO.ID_INGRESSO, NM_CATEGORIA_INGRESSO, NM_TIPO_INGRESSO, QTD_TIPO_INGRESSO, VL_PRECO_TIPO, NM_EVENTO, DS_HORARIO, DS_LOGRADOURO, DS_LOCALIDADE, DS_UF, DS_NUM, DS_EVENTO, IMAGEM_INGRESSO, DT_CADASTRO, BT_DESTAQUE

        ORDER BY  	NM_CATEGORIA_INGRESSO, NM_TIPO_INGRESSO
        `


    const [linhas] = await con.query(comando, [ `%${nome}%`, `%${nome}%` ])

    return linhas
}



export async function  buscarIngressoPorUf (uf) {

    const comando = 
    `
        SELECT  NM_EVENTO, 
                DT_COMECO,
                DT_FIM,
                DS_LOGRADOURO,
                DS_LOCALIDADE,
                DS_UF,
                DS_NUM,
                DS_EVENTO,
                IMAGEM_INGRESSO
                
            FROM 			TB_INGRESSO 			INGRESSO 
            INNER JOIN   	TB_LOCAL_EVENTO			LOCAL_EVENTO	ON	LOCAL_EVENTO.ID_LOCAL_EVENTO = INGRESSO.ID_LOCAL_EVENTO
            WHERE  DS_UF = ?;
    ` 

    const [resposta] = await con.query (comando, [uf])

    return resposta
} 

