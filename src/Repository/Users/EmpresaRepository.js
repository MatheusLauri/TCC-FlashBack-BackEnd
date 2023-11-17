

import { con } from "../connection.js";


export async function InserirEmpresa (empresa) {

    const comando = 
        `   INSERT INTO TB_CADASTRO_EMPRESA (DS_CNPJ, NM_RAZAO_SOCIAL, DS_EMAIL_EMPRESA, DS_SENHA_EMPRESA, DT_CADASTRO)
        VALUE (?, ?, ?, ?, NOW())`

    const [resposta] = await con.query (comando, 
        [
            empresa.DS_CNPJ,
            empresa.NM_RAZAO_SOCIAL,
            empresa.DS_EMAIL_EMPRESA,
            empresa.DS_SENHA_EMPRESA,
            empresa.DataCadastro

        ]);

    empresa.ID = resposta.insertId;
    return empresa;
}


export async function login(cnpj, email, senha){

    const comando = 
    `   SELECT  ID_EMPRESA,
                DS_CNPJ,      
                DS_EMAIL_EMPRESA, 
                DS_SENHA_EMPRESA      
        FROM    TB_CADASTRO_EMPRESA 
        WHERE   (DS_CNPJ = ?  OR  DS_EMAIL_EMPRESA = ?)
        AND     DS_SENHA_EMPRESA  = ?`
    
    const [resposta] = await con.query(comando, [cnpj, email, senha])
    return resposta[0]
}

export async function ListarEmpresas(){

    const comando = `
    SELECT * FROM TB_CADASTRO_EMPRESA  `

    const [resposta] = await con.query(comando)

    return resposta
}

export async function ListIngresso(id, evento ){
    const comando = 
    `
    SELECT 	INGRESSO.ID_INGRESSO,
            NM_CATEGORIA_INGRESSO,
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
            BT_DESTAQUE

        FROM 			TB_INGRESSO						INGRESSO
        INNER JOIN 		TB_CADASTRO_EMPRESA				EMPRESA			ON EMPRESA.ID_EMPRESA = INGRESSO.ID_EMPRESA
        INNER JOIN 		TB_CATEGORIA_INGRESSO 	 		CATEGORIA		ON CATEGORIA.ID_CATEGORIA_INGRESSO = INGRESSO.ID_CATEGORIA_INGRESSO
        INNER JOIN 		TB_TIPOS_INGRESSO   			TIPO 			ON TIPO.ID_INGRESSO = INGRESSO.ID_INGRESSO
        INNER JOIN		TB_LOCAL_EVENTO					LOCAL			ON LOCAL.ID_LOCAL_EVENTO = INGRESSO.ID_LOCAL_EVENTO
        INNER JOIN		TB_DATAS_INGRESSO				DATAS			ON DATAS.ID_INGRESSO = INGRESSO.ID_INGRESSO
        INNER JOIN		TB_HORARIOS_DATAS_INGRESSO		HORARIOS		ON HORARIOS.ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO

        WHERE INGRESSO.ID_EMPRESA = ?
        AND (NM_EVENTO LIKE ? OR NM_CATEGORIA_INGRESSO LIKE ?)
        AND DT_INGRESSO = (SELECT MIN(DT_INGRESSO) FROM TB_DATAS_INGRESSO WHERE ID_INGRESSO = INGRESSO.ID_INGRESSO) 
        AND DS_HORARIO = (SELECT MIN(DS_HORARIO) FROM TB_HORARIOS_DATAS_INGRESSO WHERE ID_DATA_INGRESSO = DATAS.ID_DATA_INGRESSO)

        GROUP BY
        INGRESSO.ID_INGRESSO, NM_CATEGORIA_INGRESSO, NM_EVENTO, DS_HORARIO, DS_LOGRADOURO, DS_LOCALIDADE, DS_UF, DS_NUM, DS_EVENTO, IMAGEM_INGRESSO, BT_DESTAQUE

        ORDER BY  	NM_CATEGORIA_INGRESSO
    `

    const [resposta] = await con.query(comando, [id, `%${evento}%`, `%${evento}%`]);


    return resposta
    
}

export async function alterarDadosEmpresa () {

}


export async function removerEmpresa () {
    
}

/// PARTE FORMULARIO


export async function InserirFormulario(cnpj,razao,email,senha){

    const comando = `
    INSERT INTO TB_FORMULARIO_EMPRESA (DS_CNPJ, NM_RAZAO_SOCIAL, DS_EMAIL_EMPRESA, DS_SENHA_EMPRESA) 
                VALUES (?, ?, ?, ?)

    `

    const [resposta] = await con.query(comando,[cnpj,razao,email,senha])


    return resposta
}


export async function AprovaçãoPost(id){
    const comando = 
    `
        SELECT ID_EMPRESA,
            DS_CNPJ,
            NM_RAZAO_SOCIAL,
            DS_EMAIL_EMPRESA,
            DS_SENHA_EMPRESA
        FROM TB_FORMULARIO_EMPRESA
        WHERE ID_EMPRESA = ?
    `
    
    const [resposta] = await con.query(comando,[id])

    return resposta[0]
}


export async function ListForm(){
    const comando = 
    `
        SELECT ID_EMPRESA,
               DS_CNPJ,
               NM_RAZAO_SOCIAL,
               DS_EMAIL_EMPRESA, 
               DS_SENHA_EMPRESA 
        FROM TB_FORMULARIO_EMPRESA
    `

    const [resposta] =  await con.query(comando)

    return resposta
}


export async function ReprovarCadastro(id){
    const comando = `
        DELETE FROM TB_FORMULARIO_EMPRESA WHERE ID_EMPRESA = ?
    `

    const [resposta] = await con.query(comando, id) 

    return resposta.affectedRows
}