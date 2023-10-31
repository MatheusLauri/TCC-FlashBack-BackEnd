
import { Router } from "express";

import { InserirCliente, alterarDadosCliente, login } from "../../Repository/Users/ClienteRepository.js";

const endpoints = Router()

import passwordValidator from 'password-validator';//import

let schema = new passwordValidator(); // cria uma instância de um objeto chamado schema, Esse objeto schema é usado para definir e aplicar regras de validação personalizadas a senhas.

schema
    .is().min(8) // Mínimo de 10 caracteres
    .is().max(300) 
    .has().uppercase(1) // Pelo menos uma letra maiúscula
    .has().digits(1) // Pelo menos um dígito numérico
    .has().not().spaces() //Sem espaços
    .has().symbols(1); // Pelo menos um caractere especial
    //console.log(schema.validate(''));
    //console.log(schema.validate('K@1BHBHBH', { details: true }));
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

        let errosSenha = schema.validate(InserirNovoCliente.senha, { list: true })

        if (errosSenha.length != 0) { //!!!!!!!!!!!!!!!!!!!!!!

            for(let item of errosSenha) {
                if (item === 'min') {
                    throw new Error('O número minímo de caracteres é 8')
                }

                if (item === 'max') {
                    throw new Error('O número maximo de caracteres é 300')
                }

                if (item === 'uppercase') {
                    throw new Error('É necessário pelo menos um caracter maiúsculo')
                }

                if (item === 'digits') {
                    throw new Error('É necessário pelo menos um digito numérico')
                }

                if (item === 'spaces') {
                    throw new Error('A senha não pode conter espaços')
                }

                if (item === 'symbols') {
                    throw new Error('É necessário pelo menos um caracter especial')
                }

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