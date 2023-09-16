
import { con } from "../connection.js";



export async function inserirIngresso(ingresso){
    
    const comando = 
    `
    INSERT INTO TB_INGRESSO(ID_CATEGORIA_INGRESSO, ID_EMPRESA, NM_EVENTO, DT_INGRESSO, DS_LOCAL, DS_EVENTO)
	       VALUES (?, ?, ?, ?, ?, ?)
    `

    const [resposta] = await con.query (comando, 
        
        [
            ingresso.Categoria,
            ingresso.Empresa,
            ingresso.NomeEvento,
            ingresso.Data,
            ingresso.Local,
            ingresso.Descricao
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
                NR_PRECO_TIPO, 
                NM_EVENTO, 
                DT_INGRESSO, 
                DS_LOCAL, 
                DS_EVENTO

        FROM 	        TB_INGRESSO		                INGRESSO
        INNER JOIN 		TB_CATEGORIA_INGRESSO 	 		CATEGORIA	ON CATEGORIA.ID_CATEGORIA_INGRESSO = INGRESSO.ID_CATEGORIA_INGRESSO
        INNER JOIN 		TB_TIPOS_INGRESSO   			TIPO 		ON TIPO.ID_INGRESSO = INGRESSO.ID_INGRESSO
        ORDER BY  	    NM_CATEGORIA_INGRESSO, NM_TIPO_INGRESSO`

    const [resposta] = await con.query(comando)

    return resposta
}



export async function alterarIngresso(id, ingresso){

    const comando = 
        `UPDATE TB_INGRESSO
                SET     ID_CATEGORIA_INGRESSO   = ?, 
                        ID_EMPRESA              = ?, 
                        NM_EVENTO               = ?, 
                        DT_INGRESSO             = ?, 
                        DS_LOCAL                = ?, 
                        DS_EVENTO               = ?
                WHERE   ID_INGRESSO = ?`

    const [resposta] = await con.query(comando, 
        
        [
            ingresso.Categoria,
            ingresso.Empresa,
            ingresso.NomeEvento,
            ingresso.Data,
            ingresso.Local,
            ingresso.Descricao, 
            id
        ]

    )
    
    return resposta.affectedRows
}



export async function removerIngresso(id){

    const comando = 
    ` DELETE FROM   TB_TIPOS_INGRESSO 
             WHERE  ID_INGRESSO = ?
    `

    const comando2 = 
    ` DELETE FROM   TB_INGRESSO
            WHERE  ID_INGRESSO = ?`

    const [resposta] = await con.query(comando, [id])
    const [resposta2] = await con.query(comando2, [id])

    return resposta2.affectedRows

}


