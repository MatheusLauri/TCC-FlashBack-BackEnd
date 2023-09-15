
import { con } from "../connection.js";


export async function InserirCliente (cliente) {

    const comando = 
    `      INSERT INTO TB_CADASTRO_CLIENTE (NM_CLIENTE, NM_SOBRENOME, DS_CPF, DS_TELEFONE, NM_USUARIO, DS_EMAIL, DS_SENHA)
	            VALUE (?, ?, ?, ?, ?, ?, ?)`

    const [resposta] = await con.query(comando, 
        [
            cliente.Nome,
            cliente.Sobrenome,
            cliente.CPF,
            cliente.Telefone,
            cliente.NomeUsuario,
            cliente.Email,
            cliente.Senha,

        ])

    cliente.ID = resposta.insertId;

    return cliente;
}