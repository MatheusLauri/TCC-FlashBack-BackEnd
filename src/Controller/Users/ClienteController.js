
import { Router } from "express";

import { InserirCliente, alterarDadosCliente, login } from "../../Repository/Users/ClienteRepository.js";

const endpoints = Router()

import passwordValidator from 'password-validator';

let schema = new passwordValidator(); 

schema
    .is().min(8, 'O número minímo de caracteres é 8') // Mínimo de caracteres
    .is().max(300, 'O número maximo de caracteres é 300') // Máximo de caracteres
    .has().uppercase(1, 'É necessário pelo menos um caracter maiúsculo') // Pelo menos uma letra maiúscula
    .has().digits(1, 'É necessário pelo menos um digito numérico') // Pelo menos um dígito numérico
    .has().not().spaces(true ,'A senha não pode conter espaços') //Sem espaços
    .has().symbols(1, 'É necessário pelo menos um caracter especial'); // Pelo menos um caractere especial

    //testes:
    //console.log(schema.validate(''));
    //console.log(schema.validate('@ 1', { details: true }));
    //console.log(schema.validate('', { list: true }));


endpoints.post('/cliente', async (req, resp) => {

    try {
        
        const InserirNovoCliente = req.body
        
       /* if(!InserirNovoCliente.NomeUsuario)
            throw new Error('Usuario Obrigatório!')

        if(!InserirNovoCliente.Email)
            throw new Error('E-mail Obrigatório!')
        */
        if(!InserirNovoCliente.Senha)
            throw new Error('Senha Obrigatória!')

        let errosSenha = schema.validate(InserirNovoCliente.Senha, { details: true })
        
        if (errosSenha.length != 0) { 

            for(let item of errosSenha) {

                throw new Error(`${item.message}`)

            }
        }

        const clienteInserido = await InserirCliente(InserirNovoCliente)

        resp.send(clienteInserido)

    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
})

endpoints.post('/cliente/login', async (req, resp) => {

    try {
        
        const {NomeUsuario, cpf, email, senha} = req.body

        const resposta = await login(NomeUsuario, cpf, email, senha)

        if(!NomeUsuario && !cpf && !email)   
            throw new Error("É necessário inserir um CPF, email ou nome de usuário.")

        if(!senha)   
            throw new Error("É necessário inserir uma senha.")

        if(!resposta)   
        throw new Error("Crendenciais inválidas")           

        resp.send(resposta)
        
    }
    catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }

})


endpoints.put('/cliente/alterarInfos/:id', async (req, resp) => {

    

        const {id} = req.params

        const cliente = req.body

        if(isNaN(id))
            throw new Error('Id obrigatório')
        

        const alterar = await alterarDadosCliente(id, cliente)

        resp.status(204).send()

  
    
})



export default endpoints;