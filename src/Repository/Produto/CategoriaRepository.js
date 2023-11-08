
import { con } from "../connection.js";


export async function inserirCategoriaIngresso(categoria) {
    
    const comando = 
    `INSERT INTO TB_CATEGORIA_INGRESSO(NM_CATEGORIA_INGRESSO)
            VALUES (?)`
    
    const [resposta] = await con.query (comando, 
        [
            categoria.Categoria
        ]
    )
    categoria.ID = resposta.insertId;

    return categoria;
 
}



export async function listarCategorias () {

    const comando = 
    `  SELECT * 
            FROM   TB_CATEGORIA_INGRESSO `
    
    const [resposta] = await con.query(comando)

    return resposta;
}



export async function alterarCategoria (id, categoria) {

    const comando = 
    `  UPDATE   TB_CATEGORIA_INGRESSO
                SET     NM_CATEGORIA_INGRESSO = ?
                WHERE   ID_CATEGORIA_INGRESSO = ? `
    
    const [resposta] = await con.query(comando, 
        [
            categoria.Categoria,
            id
        ]
    )

    return resposta.affectedRows;
}


export async function removerCategoria (id) {

    const comando = 
    `   DELETE  FROM TB_CATEGORIA_INGRESSO 
                WHERE ID_CATEGORIA_INGRESSO = ?`
    
    const [resposta] = await con.query(comando, [id])

    return resposta.affectedRows;
}


export async function BuscarNomeTipo(nome){

        const comando = 
        `
        SELECT  INGRESSO.ID_INGRESSO,
		NM_CATEGORIA_INGRESSO,
		NM_TIPO_INGRESSO, 
        QTD_TIPO_INGRESSO, 
        VL_PRECO_TIPO, 
        NM_EVENTO, 
        DT_COMECO,
        DT_FIM,
        DS_LOGRADOURO,
        DS_LOCALIDADE,
        DS_UF,
        DS_EVENTO,
        IMAGEM_INGRESSO,
        DT_CADASTRO,
        BT_DESTAQUE
        
        FROM 			TB_INGRESSO					INGRESSO
	    INNER JOIN 		TB_CATEGORIA_INGRESSO 	 		        CATEGORIA		ON CATEGORIA.ID_CATEGORIA_INGRESSO = INGRESSO.ID_CATEGORIA_INGRESSO
        INNER JOIN 		TB_TIPOS_INGRESSO   			        TIPO 			ON TIPO.ID_INGRESSO = INGRESSO.ID_INGRESSO
        INNER JOIN		TB_LOCAL_EVENTO					LOCAL			ON LOCAL.ID_LOCAL_EVENTO = INGRESSO.ID_LOCAL_EVENTO
	    WHERE CATEGORIA.NM_CATEGORIA_INGRESSO LIKE ?
        `
      
        
    const [linhas] = await con.query(comando, [ `%${nome}%` ])


    return linhas
}