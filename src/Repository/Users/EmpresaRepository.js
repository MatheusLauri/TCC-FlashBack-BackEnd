

import { con } from "../connection.js";


export async function InserirEmpresa (empresa) {

    const comando = 
        `   INSERT INTO TB_CADASTRO_EMPRESA (DS_CNPJ, NM_RAZAO_SOCIAL, DS_EMAIL_EMPRESA, DS_SENHA_EMPRESA, DS_ENDERECO_EMPRESA)
        VALUE (?, ?, ?, ?, ?)`

    const [resposta] = await con.query (comando, 
        [

            empresa.CNPJ,
            empresa.RazaoSocial,
            empresa.Email,
            empresa.Senha,
            empresa.Endereco

        ]);

    empresa.ID = resposta.insertId;

    return empresa;
}