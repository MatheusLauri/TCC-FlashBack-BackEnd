
import {inserirIngresso, removerIngresso, ListarIngressos, alterarIngresso} from "../../Repository/Produto/IngressoRepository.js"


import { Router } from "express";
const endpoints  = Router();



endpoints.post('/ingresso', async (req, resp) => {

    try {

        const inserir = req.body


        if(!inserir.Categoria)
            throw new Error('Nome categoria obrigatoria!')

        if(!inserir.Empresa)
            throw new Error('Nome Empresa obrigatoria!')
        
        if(!inserir.NomeEvento)
            throw new Error('Nome evento obrigatorio!')

        if(!inserir.Local)
            throw new Error('Local obrigatorio!')
     
        if(!inserir.Descricao)
           throw new Error('Descrição obrigatorio!')

        if(!inserir.Data)
           throw new Error('Data obrigatorio!')

        const ingressoInserido = await inserirIngresso(inserir)

        if(ingressoInserido.length > 0)
            throw new Error('Ingresso já cadastrado')

        resp.send(ingressoInserido)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})


endpoints.get('/ingresso',async (req, resp) => {
    try{
        // n tem validação 
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

        
        if(!ingresso.Categoria)
            throw new Error('Nome categoria obrigatoria!')

        if(!ingresso.Empresa)
            throw new Error('Nome Empresa obrigatoria!')
        
        if(!ingresso.NomeEvento)
            throw new Error('Nome evento obrigatorio!')

        if(!ingresso.Local)
            throw new Error('Local obrigatorio!')
     
        if(!ingresso.Descricao)
           throw new Error('Descrição obrigatorio!')

        if(!ingresso.Data)
           throw new Error('Data obrigatorio!')

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

        if(deletar == 0)
            throw new Error('ingresso  não pode ser deletada');
        
        resp.status(204).send()

    } catch (err) {
        resp.status(400).send({
            erro: err.message
       })
    }
})

export default endpoints;