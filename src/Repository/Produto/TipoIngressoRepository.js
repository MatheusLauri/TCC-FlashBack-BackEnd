
import { con } from "../connection.js";


export async function inserirTipoIngresso(tipo){
    const comando = 
    `   INSERT INTO TB_TIPOS_INGRESSO (ID_INGRESSO, NM_TIPO_INGRESSO, QTD_TIPO_INGRESSO, VL_PRECO_TIPO) 
                VALUES (?, ?, ?, ?)`

    const [resposta] = await con.query (comando,
            
            [
                tipo.Ingresso,
                tipo.Tipo,
                tipo.Quantidade,
                tipo.Preco
            ]

        )

    tipo.ID = resposta.insertId;

    return tipo;

}



export async function listarTipos (id) {

    const comando = 
    `  SELECT * FROM   
                TB_TIPOS_INGRESSO
                WHERE ID_INGRESSO = ? `
    
    const [resposta] = await con.query(comando, [id])

    return resposta;
}



export async function alterarTipoIngresso (id, tipo) {

    const comando = 
    `   UPDATE  TB_TIPOS_INGRESSO 
                SET     NM_TIPO_INGRESSO        = ?, 
                        QTD_TIPO_INGRESSO       = ?, 
                        VL_PRECO_TIPO           = ?
                WHERE ID_TIPO_INGRESSO          = ? `

    const [resposta] = await con.query(comando, 
        [
            tipo.Tipo,
            tipo.Quantidade,
            tipo.Preco,
            id
        ]
    )

    return resposta.affectedRows

}



export async function removerTipoIngresso (id) {

    const comando = 
    `   DELETE  FROM TB_TIPOS_INGRESSO
                WHERE ID_TIPO_INGRESSO = ?`
    
    const [resposta] = await con.query(comando, [id])

    return resposta.affectedRows;
}