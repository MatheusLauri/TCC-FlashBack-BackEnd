
import { con } from "../connection.js";


export async function inserirLocal (local) {

    const comando = 
    `   INSERT INTO TB_LOCAL_EVENTO (DS_CEP, DS_LOGRADOURO, DS_BAIRRO, DS_LOCALIDADE, DS_UF, DS_NUM)
            VALUES (?, ?, ?, ?, ?, ?)`

    const [resposta] = await con.query(comando, 
        [
            local.CEP,
            local.Logradouro,
            local.Bairro,
            local.Localidade,
            local.UF,
            local.Numero
        ])

    local.ID = resposta.insertId

    return local;

}



export async function alterarLocal (id, local) {

    const comando = 
    `   UPDATE TB_LOCAL_EVENTO 
            SET     DS_CEP              = ?, 
                    DS_LOGRADOURO       = ?, 
                    DS_BAIRRO           = ?, 
                    DS_LOCALIDADE       = ?, 
                    DS_UF               = ?, 
                    DS_NUM              = ?
            WHERE ID_LOCAL_EVENTO = ?
          `

    const [resposta] = await con.query(comando, 
        [
            local.CEP,
            local.Logradouro,
            local.Bairro,
            local.Localidade,
            local.UF,
            local.Numero,
            id
        ])


    return resposta.affectedRows;

}