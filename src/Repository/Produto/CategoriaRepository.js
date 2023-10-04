
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
            SELECT 
                NM_CATEGORIA_INGRESSO  Categoria
            FROM TB_CATEGORIA_INGRESSO 
                WHERE NM_CATEGORIA_INGRESSO LIKE ?
        `
      
        
    const [linhas] = await con.query(comando, [ `%${nome}%` ])


    return linhas
}