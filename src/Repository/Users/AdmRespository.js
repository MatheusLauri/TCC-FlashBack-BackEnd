import { con } from "../connection.js";

export async function login(cpf, email, senha){

    const comando = 
    `   SELECT  DS_CNPJ,      
                DS_EMAIL_EMPRESA, 
                DS_SENHA_EMPRESA      
        FROM    TB_CADASTRO_EMPRESA 
        WHERE   (DS_CNPJ = ?  OR  DS_EMAIL_EMPRESA = ?)
        AND     DS_SENHA_EMPRESA  = ?`
    
    const [resposta] = await con.query(comando, [cpf, email, senha])
    return resposta[0]
}