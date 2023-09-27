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