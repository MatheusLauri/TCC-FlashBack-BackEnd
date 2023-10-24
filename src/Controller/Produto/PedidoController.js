

import { DeletarPedido, DeletarPedidoIngresso, InserirPedido, InserirPedidoIngresso, ListarPedido, ListarPedidoIngresso } from "../../Repository/Produto/PedidoRepository.js";

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

export default endpoints;