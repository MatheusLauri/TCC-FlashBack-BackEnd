

import { AdicionarQtdItens, DeletarPedido, DeletarPedidoIngresso, InserirPedido, InserirPedidoIngresso, ListarPedido, ListarPedidoIngresso, TransferirIngresso } from "../../Repository/Produto/PedidoRepository.js";

import { Router } from "express";

const endpoints  = Router()


endpoints.post('/pedidoIngresso', async (req, resp) =>{

    try {
        
    const NovoPedido = req.body

    const Pedido = await InserirPedidoIngresso(NovoPedido)

    resp.send(Pedido)

    }catch (err) {
        resp.status(404).send({
            erro: err.message
        })  
    }
})


endpoints.post('/pedido', async (req, resp) => {

    try {
        const NovoPedido = req.body

        const Pedido = await InserirPedido(NovoPedido)

        resp.send(Pedido)
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }

})


endpoints.get('/listarPedido', async (req,resp) =>{
    try {
        
        const listagem = await ListarPedido()
        
        resp.send(listagem)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })  
    }
})

endpoints.get('/listarPedidoIngresso', async (req,resp) => {
    try {
        const listagem = await ListarPedidoIngresso()

        resp.send(listagem)
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

endpoints.delete('/deletarPedido/:id', async (req,resp) =>{
    try {

        const {id} = req.params 

        const deletar = await DeletarPedido(id)

        if(deletar == 0)
            throw new Error('ingresso não pode ser deletado');

        resp.status(204).send

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


endpoints.delete('/deletarPedidoIngresso/:id', async (req,resp) => {
    try {
        
        const {id} = req.params

        const deletar = await DeletarPedidoIngresso(id)

        if(deletar == 0)
            throw new Error('ingresso não pode ser deletado');

        resp.status(204).send
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


endpoints.put('/pedidoIngresso/:id', async (req, resp) => {
    try {
        
        const {id} = req.params 
        const ingresso = req.body


        const alterar = await AdicionarQtdItens(ingresso,id)

        resp.status(204).send()

    } catch (err) {
        resp.status(404).send({
            erro : err.mensag
        })
    }
})


endpoints.put('/transferencia', async (req,resp) =>{
    try {
        
        const {email , pedidoIngresso} = req.query
        
    
        const transferencia = await TransferirIngresso(email , pedidoIngresso)

        
        resp.status(204).send()


    } catch (err) {
        resp.status(404).send({
            erro : err.mensag
        })
    }
})

export default endpoints;