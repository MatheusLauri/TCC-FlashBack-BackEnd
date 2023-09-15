
import { Router } from "express";

import { InserirCliente } from "../../Repository/Users/ClienteRepository.js";

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






export default endpoints;