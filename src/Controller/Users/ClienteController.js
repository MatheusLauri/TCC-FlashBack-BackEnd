
import { Router } from "express";

import { InserirCliente, login } from "../../Repository/Users/ClienteRepository.js";

const endpoints = Router()


endpoints.post('/cliente', async (req, resp) => {

    try {
        
        const InserirNovoCliente = req.body

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
        
        const {email, senha} = req.body
        const resposta = await login(email, senha)

        if(!resposta)   
            throw new Error("Crendencias invalidas")

        resp.send(resposta)
        
    }
    catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }

})






export default endpoints;