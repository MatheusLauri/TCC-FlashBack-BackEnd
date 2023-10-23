
import { con } from "../connection.js";


export async function inserirLocal (local) {

    const comando = 
    `   INSERT INTO TB_LOCAL_EVENTO (DS_CEP, DS_LOGRADOURO, DS_BAIRRO, DS_LOCALIDADE, DS_UF)
            VALUES (?, ?, ?, ?, ?)`

    const [resposta] = await con.query(comando, 
        [
            local.CEP,
            local.Logradouro,
            local.Bairro,
            local.Localidade,
            local.UF,
        ])

    local.ID = resposta.insertId

    return local;

}