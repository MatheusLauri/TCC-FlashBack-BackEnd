

import { Router } from "express";
import { inserirCategoriaIngresso } from "../../Repository/Produto/IngressoRepository.js";
const endpoints  = Router()



endpoints.post('/tipoIngresso', async (req, resp) => {

    try {

        const inserirTipo = req.body

        const tipoinserido = await inserirCategoriaIngresso(inserirTipo)

        resp.send(tipoinserido)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})