
import { Router } from "express";

import { InserirCliente, login } from "../../Repository/Users/ClienteRepository.js";

const endpoints = Router()


endpoints.post('/cliente', async (req, resp) => {

    try {
        
        const InserirNovoCliente = req.body
        

        if(!InserirNovoCliente.Nome)
            throw new Error('Nome Obrigatorio!')

        if(!InserirNovoCliente.Sobrenome)
            throw new Error('Sobrenome Obrigatorio!')
            
        if(!InserirNovoCliente.CPF)
            throw new Error('CPF Obrigatorio!')

        if(!InserirNovoCliente.Telefone)
            throw new Error('Telefone Obrigatório!')

        if(!InserirNovoCliente.NomeUsuario)
            throw new Error('Usuario Obrigatório!')

        if(!InserirNovoCliente.Email)
            throw new Error('E-mail Obrigatório!')

        if(!InserirNovoCliente.Senha)
            throw new Error('Senha Obrigatória!')

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



export default endpoints;