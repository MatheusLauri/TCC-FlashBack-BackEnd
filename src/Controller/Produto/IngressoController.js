
import {inserirTipoIngresso, inserirCategoriaIngresso, inserirIngresso, ListarIngresso} from "../../Repository/Produto/IngressoRepository.js"


import { Router } from "express";
const endpoints  = Router()


endpoints.post('/TipoIngresso', async (req, resp) => {

    try {

        const inserirTipo = req.body

        const tipoinserido = await inserirTipoIngresso(inserirTipo)

        resp.send(tipoinserido)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})


endpoints.post('/Categoria', async (req, resp) => {

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



endpoints.post('/Ingresso', async (req, resp) => {

    try {

        const inserirIngress = req.body

        const ingressoInserido = await inserirIngresso(inserirIngress)

        resp.send(ingressoInserido)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})


endpoints.get('/Ingressos',async (req,resp) => {
    try{

        const listagem = await ListarIngresso()
        resp.send(listagem)

    } catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
    
})


endpoints.delete('/ingresso', async (req, resp) => {
    try {
        
        const {id} = req.params

        const deletar = await removerIngresso(id)
        
        if (resposta != 1)
            throw new Error('Ingresso não pode ser removido.');

            resp.status(204).send()

    } catch (err) {
        resp.status(400).send({
            erro: err.message
       })
    }
})

export default endpoints;