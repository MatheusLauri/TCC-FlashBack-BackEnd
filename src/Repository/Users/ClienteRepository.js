
import { con } from "../connection.js";


export async function InserirCliente (cliente) {

    const comando = 
    `      INSERT INTO TB_CADASTRO_CLIENTE (NM_CLIENTE, NM_SOBRENOME, DS_CPF, DT_NASCIMENTO, DS_TELEFONE, NM_USUARIO, DS_EMAIL, DS_SENHA, DT_CADASTRO)
	            VALUE (?, ?, ?, ?, ?, ?, ?, ?, now())`

    const [resposta] = await con.query(comando, 
        [
            cliente.Nome,
            cliente.Sobrenome,
            cliente.CPF,
            cliente.DataNasc,
            cliente.Telefone,
            cliente.NomeUsuario,
            cliente.Email,
            cliente.Senha,

        ])

    cliente.ID = resposta.insertId;

    return cliente;
}



export async function login(NomeUsuario, cpf, email, senha){
    
    const comando = 
    `   SELECT  ID_CLIENTE,
                NM_CLIENTE,
                NM_SOBRENOME,
                DS_CPF,
                DT_NASCIMENTO,
                DS_TELEFONE,
                NM_USUARIO,
                DS_EMAIL,
                DS_SENHA,
                DT_CADASTRO
        FROM TB_CADASTRO_CLIENTE 
        WHERE  (NM_USUARIO = ? OR DS_CPF = ? OR DS_EMAIL = ?) 
        AND    DS_SENHA = ?`
    
    const [resposta] = await con.query(comando,[NomeUsuario, cpf, email, senha])
    return resposta[0]
}



export async function alterarDadosCliente (id, cliente) {

    const comando = 
    ` UPDATE TB_CADASTRO_CLIENTE
            SET  NM_CLIENTE     = ?, 
            NM_SOBRENOME        = ?, 
            DS_CPF              = ?, 
            DT_NASCIMENTO       = ?,
            DS_TELEFONE         = ?, 
            NM_USUARIO          = ?, 
            DS_EMAIL            = ?,
            DS_SENHA            = ?,
            DT_CADASTRO         = now()
            WHERE   ID_CLIENTE = ?`

    const [resposta] = await con.query(comando, 
    
    [
        cliente.Nome,
        cliente.Sobrenome,
        cliente.CPF,
        cliente.Data,
        cliente.Telefone,
        cliente.NomeUsuario,
        cliente.Email,
        cliente.Senha,
        id
    ])

    return resposta.affectedRows

}

export async function ListarUsuarios(){

    const comando = `
    SELECT * FROM TB_CADASTRO_CLIENTE
             ORDER BY DT_CADASTRO DESC `

    const [resposta] = await con.query(comando)

    return resposta
}

export async function removerCliente () {

}