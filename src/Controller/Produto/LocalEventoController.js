

import { inserirLocal } from "../../Repository/Produto/LocalEventoRepository.js";

import { Router } from "express";
const endpoints  = Router()


endpoints.post('/local', async (req, resp) => {

    try {

        const novoLocal = req.body

        const localInserido = await inserirLocal(novoLocal)

        resp.send(localInserido)
        
    } catch (err) {
        
        resp.status(404).send({
            erro: err.message
        })  

    }
})


export default endpoints;