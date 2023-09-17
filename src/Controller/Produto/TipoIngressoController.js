

import { alterarTipoIngresso, inserirTipoIngresso, listarTipos, removerTipoIngresso } from "../../Repository/Produto/TipoIngressoRepository.js";

import { Router } from "express";

const endpoints  = Router()

// fazer 

endpoints.get('/tipoIngresso', async (req, resp) => {

    try {
        // n tem validação
        const tipos = await listarTipos()

        resp.send(tipos)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})

endpoints.post('/tipoIngresso', async (req, resp) => {

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



endpoints.put('/tipoIngresso/:id', async (req, resp) => {

    try {

        const {id} = req.params

        const tipo = req.body

        const tipoAlterado = await alterarTipoIngresso(id, tipo)

        resp.status(204).send()
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})



endpoints.delete('/tipoIngresso/:id', async (req, resp) => {

    try {

        const {id} = req.params

        const tipoDeletado = await removerTipoIngresso(id)

        if(tipoDeletado == 0)
            throw new Error('Tipo não pode ser deletado');

        resp.status(204).send()
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})



export default endpoints;