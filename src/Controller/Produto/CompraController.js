import { FormaPagamento, Pedido, PedidoIngresso, inserirCartao } from '../../Repository/Produto/CompraRepository.js'

import { Router } from "express";
const endpoints  = Router()






endpoints.post('/Cartao', async (req,resp) => {
    try {

        const inserir = req.body

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

        const PedidoInserido = await Pedido(ped)

        resp.send(PedidoInserido)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        }) 
    }

})







export default endpoints;