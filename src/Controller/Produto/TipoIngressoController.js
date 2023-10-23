

import { alterarTipoIngresso, inserirTipoIngresso, listarTipos, removerTipoIngresso } from "../../Repository/Produto/TipoIngressoRepository.js";

import { Router } from "express";

const endpoints  = Router()



endpoints.get('/tipoIngresso/:id', async (req, resp) => {

    try {
        const {id} = req.params
        const tipos = await listarTipos(id)

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


        if(!inserirTipo.Ingresso)
            throw new Error('Id ingresso Obrigatorio')
        
        if(!inserirTipo.Tipo)
            throw new Error('Tipo Ingresso Obrigatorio')

        if(!inserirTipo.Quantidade)
            throw new Error('Quantidade tipo ingresso Obrigatorio');

        if(inserirTipo.Preco === undefined)
            throw new Error('Preco tipo ingresso Obrigatorio')

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

        if(!tipo.Ingresso)
            throw new Error('Id ingresso Obrigatorio')
        
        if(!tipo.Tipo)
            throw new Error('Tipo Ingresso Obrigatorio')

        if(!tipo.Quantidade)
            throw new Error('Quantidade tipo ingresso Obrigatorio');

        if(!tipo.Preco)
            throw new Error('Preco tipo ingresso Obrigatorio')

        if(isNaN(id))
            throw new Error('Erro no id')
        
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