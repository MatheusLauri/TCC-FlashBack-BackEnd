

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
    `   SELECT  DS_CNPJ,      
                DS_EMAIL_EMPRESA, 
                DS_SENHA_EMPRESA      
        FROM    TB_CADASTRO_EMPRESA 
        WHERE   (DS_CNPJ = ?  OR  DS_EMAIL_EMPRESA = ?)
        AND     DS_SENHA_EMPRESA  = ?`
    
    const [resposta] = await con.query(comando, [cnpj, email, senha])
    return resposta[0]
}


export async function alterarDadosEmpresa () {

}


export async function removerEmpresa () {
    
}