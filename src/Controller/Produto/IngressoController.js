
import {inserirTipoIngresso, inserirCategoriaIngresso, inserirIngresso, ListarIngresso} from "../../Repository/Produto/IngressoRepository.js"


import { Router } from "express";
const endpoints  = Router()


endpoints.post('/TipoIngresso', async (req, resp) => {

    try {

        const resp = req.body

        const tipoinserido = await inserirTipoIngresso(resp)

        resp.send(tipoinserido)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})


endpoints.post('/inserirCategoria', async (req, resp) => {

    try {

        const resp = req.body

        const categoriainserido = await inserirCategoriaIngresso(resp)

        resp.send(categoriainserido)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})



endpoints.post('/inserirIngresso', async (req, resp) => {

    try {

        const resp = req.body

        const ingressoInserido = await inserirIngresso(resp)

        resp.send(ingressoInserido)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})


endpoints.get('/listarIngressos',async (req,resp) => {
    try{

        const resposta = await ListarIngresso()
        resp.send(resposta)

    } catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
    
})


export default endpoints;