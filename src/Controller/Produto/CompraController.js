import { AlterarPedido, AlterarPedidoIngresso, DeletePedido, DeletePedidoIngresso, FormaPagamento, ListagemPedido, ListagemPedidoIngresso, Pedido, PedidoIngresso, inserirCartao } from '../../Repository/Produto/CompraRepository.js'

import { Router } from "express";
const endpoints  = Router()






endpoints.post('/Cartao', async (req,resp) => {
    try {

        const inserir = req.body

        // if(!inserir.Numero)
        //     throw new Error("Numero do cartão Obrigatorio")

            
        // if(!inserir.Validade)
        //     throw new Error("Validade do cartão Obrigatorio")

        // if(!inserir.Cvv)
        //     throw new Error("Cvv do cartão Obrigatorio")

        const CartaoInserido = await inserirCartao(inserir)

        resp.send(CartaoInserido)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        }) 
    }
})


endpoints.post('/Pagamento', async (req,resp) => {
    try {
        
        const pag = req.body

        // if(!pag.FormaDePag)
        //     throw new Error("Forma de pagamento Obrigatorio")

        const PagamentoInserido = await FormaPagamento(pag)

        resp.send(PagamentoInserido)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        }) 
    }
})


endpoints.post('/PedidoIngresso', async (req,resp) => {

    try {
        
        const pedido = req.body

        // if(!pedido.Cliente)
        //     throw new Error("Cliente Obrigatorio")

        // if(!pedido.Ingresso)
        //     throw new Error("Ingresso obrigatorio")

        // if(!pedido.TipoIngresso)
        //     throw new Error("TipoIngresso obrigatorio")
    
        // if(!pedido.Qtd)
        //     throw new Error("Quantidade Obrigatorio")

        const PedidoInserido = await  PedidoIngresso(pedido)

        resp.send(PedidoInserido)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        }) 
    }
})



endpoints.post('/Pedido', async (req,resp) => {

    try {
        
        const ped = req.body

        
        // if(!ped.PedidoIngresso)
        //     throw new Error("Pedido ingresso invalido")
                   
        // if(!ped.FormaPagamento)
        //     throw new Error("Forma de pagamento invalida")
               
        // if(!ped.Situacao)
        //     throw new Error("Situação obrigatorio")

        const PedidoInserido = await Pedido(ped)

        resp.send(PedidoInserido)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        }) 
    }

})


endpoints.put('/AlterarPedidoIngresso/:id', async (req, resp) => {
    try {
        
        const {id} = req.params
        const pedIngress = req.body


        const alterar = await AlterarPedidoIngresso(pedIngress,id)
        
        
        resp.status(204).send
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })  
    }
}) 



endpoints.put('/AlterarPedido/:id', async (req,resp) => {
    try {
        
        const {id} = req.params
        const situ = req.body

        const alterar = await AlterarPedido(situ,id)

        resp.status(204).send

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })  
    }
})



endpoints.get('/PedidoIngresso', async (req,resp) => {
    try {
        
        const listagem = await ListagemPedidoIngresso()
        resp.send(listagem)


    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })  
    }
})


endpoints.get('/Pedido', async (req,resp) => {
    try {
        
        const listagem = await ListagemPedido()
        resp.send(listagem)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })  
    }
})


endpoints.delete('/PedidoIngresso/:id', async (req,resp) => {
    try {
        
        const {id} = req.params

        const deletar = await DeletePedidoIngresso(id)

        
        if(!deletar)
            throw new Error("Id Pedido Ingresso desconhecido")

        resp.status(204).send()


    } catch (err) {
        resp.status(400).send({
            erro: err.message
       })
    }
})


endpoints.delete('/Pedido/:id', async (req,resp) => {
    try {
        const {id} = req.params
        
        const deletar = await DeletePedido(id)


        if(!deletar)
            throw new Error("Id Pedido invalido")


        resp.status(204).send()
    } catch (err) {
        resp.status(400).send({
            erro: err.message
       })
    }
})

export default endpoints;