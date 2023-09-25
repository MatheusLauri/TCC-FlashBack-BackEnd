
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
            throw new Error('Tel Obrigatorio!')

        if(!InserirNovoCliente.NomeUsuario)
            throw new Error('Usuario Obrigatorio!')

        if(!InserirNovoCliente.Email)
            throw new Error('Email Obrigatorio!')

        if(!InserirNovoCliente.Senha)
            throw new Error('Senha Obrigatorio!')

        const clienteInserido = await InserirCliente(InserirNovoCliente)

        if(clienteInserido.length > 0 )
            throw new Error('cliente já inserido');

        resp.send(clienteInserido)

    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
})

endpoints.post('/cliente/login', async (req, resp) => {

    try {
        
        // arrumar 
        const {email, senha} = req.body


                
      //  if(!email || !senha)
      //      throw new Error('Nome ou senha inval')       validação entrando direto


        const resposta = await login(email, senha)

        if(!resposta)   
        throw new Error("Crendencias invalidas")            //validação entrando direto (arrumar umas das duas)

        resp.send(resposta)
        
    }
    catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }

})



export default endpoints;