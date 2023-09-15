import { con } from "../connection.js";


export async function inserirTipoIngresso(ingresso){
    const comando = 
    `INSERT INTO TB_TIPOS_INGRESSO (ID_INGRESSO, NM_TIPO_INGRESSO, QTD_TIPO_INGRESSO, NR_PRECO_TIPO) 
            VALUES (?, ?, ?, ?)`

    const [resposta] = await con.query (comando,
            
            [
                ingresso.Ingresso,
                ingresso.Tipo_ingresso,
                ingresso.Quantidade,
                ingresso.Preco
            ]

        )

        ingresso.ID = resposta.insertId;

    return ingresso;

}


export async function inserirCategoriaIngresso(categoria){
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

    //talvez esse n use, pois ele escolhe a catergoria quando ele clicar nas fotinhas do adm
}


export async function inserirIngresso(ingresso){
    
    const comando = 
    `
    INSERT INTO TB_INGRESSO(ID_CATEGORIA_INGRESSO, ID_EMPRESA, NM_EVENTO, DT_INGRESSO, DS_LOCAL, DS_EVENTO)
	       VALUES (?, ?, ?, ?, ?, ?)
    `

    const [resposta] = con.query (comando, 
        
        [
            ingresso.Categoria,
            ingresso.Empresa,
            ingresso.NomeEvento,
            ingresso.Data,
            ingresso.Ingresso,
            ingresso.Local,
            ingresso.Evento
        ] 
    )

    ingresso.ID = resposta.insertId;

    return ingresso;
}


export async function ListarIngresso(){

    const comando = `
        SELECT  NM_CATEGORIA_INGRESSO,
                NM_TIPO_INGRESSO, 
                QTD_TIPO_INGRESSO, 
                NR_PRECO_TIPO, 
                NM_EVENTO, 
                DT_INGRESSO, 
                DS_LOCAL, 
                DS_EVENTO
        FROM 	TB_INGRESSO		 INGRESSO
        INNER JOIN 		TB_CATEGORIA_INGRESSO 	 		CATEGORIA	ON CATEGORIA.ID_CATEGORIA_INGRESSO = INGRESSO.ID_CATEGORIA_INGRESSO
        INNER JOIN 		TB_TIPOS_INGRESSO   			TIPO 		ON TIPO.ID_INGRESSO = INGRESSO.ID_INGRESSO
        ORDER BY  	    NM_CATEGORIA_INGRESSO, NM_TIPO_INGRESSO`

        const [linhas] = await con.query(comando)
        return linhas
}



export async function alterarIngresso(){

}



export async function removerIngresso(id){

    const comando = 
    ` DELETE FROM TB_INGRESSO WHERE ID_INGRESSO = ?`

    const [resposta] = await con.query(comando, [id])
    return resposta.affectedRows
}