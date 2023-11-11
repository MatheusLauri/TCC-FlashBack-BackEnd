

import { con } from "../connection.js";


export async function InserirEmpresa (empresa) {

    const comando = 
        `   INSERT INTO TB_CADASTRO_EMPRESA (DS_CNPJ, NM_RAZAO_SOCIAL, DS_EMAIL_EMPRESA, DS_SENHA_EMPRESA)
        VALUE (?, ?, ?, ?)`

    const [resposta] = await con.query (comando, 
        [

            empresa.CNPJ,
            empresa.RazaoSocial,
            empresa.Email,
            empresa.Senha,

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

export async function ListIngresso(id){
    const comando = 
    `
    SELECT  *
	FROM 			TB_INGRESSO						INGRESSO
    INNER JOIN 		TB_CADASTRO_EMPRESA				EMPRESA			ON EMPRESA.ID_EMPRESA = INGRESSO.ID_EMPRESA
	INNER JOIN 		TB_CATEGORIA_INGRESSO 	 		CATEGORIA		ON CATEGORIA.ID_CATEGORIA_INGRESSO = INGRESSO.ID_CATEGORIA_INGRESSO
    INNER JOIN 		TB_TIPOS_INGRESSO   			TIPO 			ON TIPO.ID_INGRESSO = INGRESSO.ID_INGRESSO
    INNER JOIN		TB_LOCAL_EVENTO					LOCAL			ON LOCAL.ID_LOCAL_EVENTO = INGRESSO.ID_LOCAL_EVENTO
    WHERE INGRESSO.ID_EMPRESA = ?
    `

    const [resposta] = await con.query(comando, id)
    return resposta
}

export async function alterarDadosEmpresa () {

}


export async function removerEmpresa () {
    
}

