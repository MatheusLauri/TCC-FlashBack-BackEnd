

import { alterarCategoria, inserirCategoriaIngresso, listarCategorias, removerCategoria } from "../../Repository/Produto/CategoriaRepository.js";

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



endpoints.get('/categoria', async (req, resp) => {

    try {

        const categorias = await listarCategorias()

        resp.send(categorias)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})



endpoints.put('/categoria/:id', async (req, resp) => {

    try {

        const {id} = req.params

        const categoria = req.body

        const categoriaAlterada = await alterarCategoria(id, categoria)

        resp.status(204).send()
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})



endpoints.delete('/categoria/:id', async (req, resp) => {

    try {

        const {id} = req.params

        const categoriaDeletada = await removerCategoria(id)

        resp.status(204).send()
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})

export default endpoints;