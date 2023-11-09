import { con } from "../connection.js";

export async function login(email, senha){

    const comando = 
    `   SELECT  DS_EMAIL_ADM,      
                DS_SENHA_ADM     
        FROM    TB_CADASTRO_ADM 
        WHERE   DS_EMAIL_ADM    = ?
        AND     DS_SENHA_ADM    = ?`
    
    const [resposta] = await con.query(comando, [email, senha])
    return resposta[0]
}

export async function ListarEmpresa(){

    const comando = `
    SELECT ID_EMPRESA, DS_CNPJ, NM_RAZAO_SOCIAL, DS_EMAIL_EMPRESA, DS_SENHA_EMPRESA FROM TB_CADASTRO_EMPRESA
    `

    const [resposta] = await con.query(comando)

    return resposta
}


export async function ListarClientes(){

    const comando = `SELECT ID_CLIENTE, NM_CLIENTE, NM_SOBRENOME, DS_CPF, DT_NASCIMENTO, DS_TELEFONE, NM_USUARIO, DS_EMAIL, DS_SENHA, DT_CADASTRO FROM TB_CADASTRO_CLIENTE
    `

    const [resposta] = await con.query(comando)

    return resposta
}