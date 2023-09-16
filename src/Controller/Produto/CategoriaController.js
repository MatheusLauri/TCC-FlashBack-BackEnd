

import { inserirCategoriaIngresso } from "../../Repository/Produto/IngressoRepository.js";

import { Router } from "express";
const endpoints  = Router()


endpoints.post('/categoria', async (req, resp) => {

    try {

        const inserirCategoria = req.body

        const categoriainserido = await inserirCategoriaIngresso(inserirCategoria)

        resp.send(categoriainserido)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})


export default endpoints;