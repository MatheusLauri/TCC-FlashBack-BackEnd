

import { AdicionarQtdItens, DeletarPedido, DeletarPedidoIngresso, InserirPedido, InserirPedidoIngresso, ListarPedido, ListarPedidoIngresso, ListarTipoIngressoPor_IdPedido, ListarTudo, TransferirIngresso } from "../../Repository/Produto/PedidoRepository.js";

import { Router } from "express";

const endpoints  = Router()


endpoints.post('/pedidoIngresso', async (req, resp) =>{

    try {
        
    const NovoPedido = req.body

    // if(!NovoPedido.Cliente)
    //      throw new Error("Cliente obrigatorio")

    // if(!NovoPedido.Ingresso)
    //     throw new Error("ingresso obrigatorio")

    // if(!NovoPedido.TipoIngresso)
    //      throw new Error("Tipo obrigatorio")

    // if(!NovoPedido.Itens)
    //      throw new Error("Itens obrigatorio")

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


endpoints.get('/pedido', async (req, resp) =>{
    try {
        
        const {id} = req.query

        const listagem = await ListarPedido(id)

        
        resp.send(listagem)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })  
    }
})



endpoints.get('/pedidoTipoIngresso/:id_Cliente/:id_Pedido', async (req, resp) =>{
    try {
        
        const {id_Cliente, id_Pedido} = req.params

        const listagem = await ListarTipoIngressoPor_IdPedido(id_Cliente, id_Pedido)

        
        resp.send(listagem)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })  
    }
})


endpoints.get('/pedidoIngresso', async (req,resp) => {
    try {
        const listagem = await ListarPedidoIngresso()

        resp.send(listagem)
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

endpoints.delete('/pedido/:id', async (req,resp) =>{
    try {

        const {id} = req.params 

        const deletar = await DeletarPedido(id)

        resp.status(204).send()

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


endpoints.delete('/pedidoIngresso/:id', async (req,resp) => {
    try {
        
        const {id} = req.params

        const deletar = await DeletarPedidoIngresso(id)

        resp.status(204).send()
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
        
        const {email, ClienteAntigo, pedidoIngresso} = req.query
        
        if(!email)
            throw new Error("Email obrigatorio")

        const transferencia = await TransferirIngresso(email , ClienteAntigo, pedidoIngresso)

        
        resp.status(204).send()


    } catch (err) {
        resp.status(404).send({
            erro : err.mensag
        })
    }
})



endpoints.get('/ListarTudo', async (req,resp) =>{
    try {

        const listagem = await ListarTudo()

        resp.send(listagem)

    } catch (err) {
        resp.status(404).send({
            erro : err.mensag
        })
    }
})
export default endpoints;