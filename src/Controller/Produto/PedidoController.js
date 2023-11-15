

import { AdicionarQtdItens, DeletarPedido, DeletarPedidoIngresso, InserirPedido, InserirPedidoIngresso, ListarPedido, ListarPedidoIngresso, TransferirIngresso } from "../../Repository/Produto/PedidoRepository.js";

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

        // if(!NovoPedido.PedidoIngresso)
        //     throw new Error("PedidoIngresso obrigatorio")

        
        // if(!NovoPedido.FormaPagamento)
        //     throw new Error("FormaPagamento obrigatorio")

        
        // if(!NovoPedido.Situacao)
        //     throw new Error("Situacao obrigatorio")

        const Pedido = await InserirPedido(NovoPedido)

        resp.send(Pedido)
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }

})


endpoints.get('/listarPedido', async (req, resp) =>{
    try {
        
        const listagem = await ListarPedido()

        if(listagem.length === 0) 
            throw new Error('Nenhum pedido encontrado')
        
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

      //  if(deletar == 0)
            //throw new Error('ingresso não pode ser deletado');

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

      //  if(deletar == 0)
          //  throw new Error('ingresso não pode ser deletado');

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
        
     //   if(!email)
           // throw new Error("Email obrigatorio")


        const transferencia = await TransferirIngresso(email , pedidoIngresso)

        
        resp.status(204).send()


    } catch (err) {
        resp.status(404).send({
            erro : err.mensag
        })
    }
})

export default endpoints;