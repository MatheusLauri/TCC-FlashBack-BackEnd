
import {inserirIngresso, removerIngresso, ListarIngressos, alterarIngresso, AlterarCapaIngresso, buscarIngressosCategoria, BuscarNomeIngresso, buscarIngressoPorUf, ListarIngressosDestaque} from "../../Repository/Produto/IngressoRepository.js"

import multer from "multer";

const upload = multer ({dest: 'Storage/capasIngressos'})

import { Router } from "express";
const endpoints  = Router();



endpoints.post('/ingresso', async (req, resp) => {

    try {

        const inserir = req.body

        if(!inserir.Categoria)
            throw new Error('Nome categoria obrigatória!')

        if(!inserir.Empresa)
            throw new Error('Nome Empresa obrigatória!')
        
        if(!inserir.NomeEvento)
            throw new Error('Nome evento obrigatório!')

        if(!inserir.Descricao)
            throw new Error('Descrição obrigatória!')
     
        // if(!inserir.DataComeco)
        //    throw new Error('Data de início obrigatória!')

        // if(!inserir.DataFim)
        //    throw new Error('Data de fim obrigatória!')


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


endpoints.get('/ingresso', async (req, resp) => {

    try{

        const listagem = await ListarIngressos()
        resp.send(listagem)

    } catch(err) {
        resp.status(404).send({
            erro: err.message
        })
    }
    
})

endpoints.get('/ingresso/destaque', async (req, resp) => {

    try{

        const listagem = await ListarIngressosDestaque()
        resp.send(listagem)

    } catch(err) {
        resp.status(404).send({
            erro: err.message
        })
    }
    
})


endpoints.get('/ingresso/categoria', async(req, resp) => {

    try{

        const {categoria} = req.query

        const listarCategoria = await buscarIngressosCategoria(categoria)

        if (listarCategoria.length < 1) 
        throw new Error ('Nenhum foi ingresso encontrado')

        resp.send(listarCategoria)

    } catch(err) {
        resp.status(404).send({
            erro: err.message
        })
    }

})


endpoints.put('/ingresso/:id/capa', upload.single('capa'), async (req, resp) => {

    try {

        if (!req.file) 
            throw new Error ('Insira uma imagem!')  

        const {id} = req.params

        const imagem = req.file.path
        
        const resposta = await AlterarCapaIngresso(imagem, id)

        if (resposta != 1)
            throw new Error ('A imagem não pode ser salva')  

        resp.status(204).send()
        
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }

})


endpoints.put('/ingresso/:id', async (req, resp) => {

    try {
        
        const {id} = req.params

        const ingresso = req.body

        
        if(!ingresso.Categoria)
            throw new Error('Nome categoria obrigatória!')

        if(!ingresso.Empresa)
            throw new Error('Nome Empresa obrigatória!')
        
        if(!ingresso.NomeEvento)
            throw new Error('Nome evento obrigatório!')

        if(!ingresso.Descricao)
            throw new Error('Descrição obrigatória!')
     
        if(!ingresso.DataComeco)
           throw new Error('Data de início obrigatória!')

        if(!ingresso.DataFim)
           throw new Error('Data de fim obrigatória!')

        if(isNaN(id))
            throw new Error('Id obrigatório')
        

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
            throw new Error('ingresso não pode ser deletado');
        
        resp.status(204).send()

    } catch (err) {
        resp.status(400).send({
            erro: err.message
       })
    }
})


endpoints.get('/ingresso/busca', async (req,resp) => {

    try {
        
        const { nome } = req.query

        
        const resposta = await BuscarNomeIngresso(nome)

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



endpoints.get('/ingresso/buscaUF', async (req, resp) => {

  try {
        
        const { uf } = req.query

        
        const resposta = await buscarIngressoPorUf(uf)


        resp.send(resposta)


    } catch (err) {
        resp.status(400).send({
            erro: err.message
       })
    }
})


export default endpoints;