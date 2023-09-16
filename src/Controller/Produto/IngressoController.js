
import {inserirTipoIngresso, inserirCategoriaIngresso, inserirIngresso, removerIngresso, ListarIngressos, alterarIngresso} from "../../Repository/Produto/IngressoRepository.js"


import { Router } from "express";
const endpoints  = Router();



endpoints.post('/ingresso', async (req, resp) => {

    try {

        const inserir = req.body

        const ingressoInserido = await inserirIngresso(inserir)

        resp.send(ingressoInserido)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})


endpoints.get('/ingresso',async (req, resp) => {
    try{

        const listagem = await ListarIngressos()
        resp.send(listagem)

    } catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
    
})


endpoints.put('/ingresso/:id', async (req, resp) => {

    try {
        
        const {id} = req.params

        const ingresso = req.body

        const alterar = await alterarIngresso(id, ingresso)

        resp.status(204).send()

    } catch (err) {

        resp.status(400).send({
            erro: err.message
        })
        
    }
})


endpoints.delete('/ingresso/:id', async (req, resp) => {
    try {
        
        const {id} = req.params

        const deletar = await removerIngresso(id)
        

            resp.status(204).send()

    } catch (err) {
        resp.status(400).send({
            erro: err.message
       })
    }
})

export default endpoints;