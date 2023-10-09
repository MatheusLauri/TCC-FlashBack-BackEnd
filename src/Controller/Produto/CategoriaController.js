

import { alterarCategoria, inserirCategoriaIngresso, listarCategorias, BuscarNomeTipo, removerCategoria } from "../../Repository/Produto/CategoriaRepository.js";

import { Router } from "express";
const endpoints  = Router()

// todas validações feita 


endpoints.post('/categoria', async (req, resp) => {

    try {

        const inserirCategoria = req.body

        if (!inserirCategoria.Categoria)
            throw new Error('Categoria obrigatoria!');  
        
        const categoriainserida = await inserirCategoriaIngresso(inserirCategoria)

        if(categoriainserida.length > 0)
            throw new Error('Categoria já cadastrada')
        
            resp.send(categoriainserido)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})



endpoints.get('/categoria', async (req, resp) => {

    try {
        // n tem validação
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


        if(!categoria.Categoria)
            throw new Error('Nome categoria obrigatoria!');


        if(isNaN(id))   
            throw new Error('Id tem que ser numero'); 


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
                
         if(categoriaDeletada == 0 )
            throw new Error('categoria  não pode ser deletada');


        resp.status(204).send()
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})

endpoints.get('/tipo/busca', async (req,resp) => {
    try {
        
        const { Categoria } = req.query

        const resposta = await BuscarNomeTipo(Categoria)

        if (resposta.length == 0)
            resp.status(404).send([])
        else
            resp.send(resposta)


    } catch (err) {
        resp.status(400).send({
            erro: err.message
       })
    }
})


export default endpoints;