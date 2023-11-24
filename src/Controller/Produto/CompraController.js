import { FormaPagamento, inserirCartao } from '../../Repository/Produto/CompraRepository.js'

import { Router } from "express";
const endpoints  = Router()



endpoints.post('/Cartao', async (req,resp) => {
    try {

        const inserir = req.body

         if(!inserir.Numero)
             throw new Error("Numero do cartão Obrigatorio")

            
         if(!inserir.Validade)
            throw new Error("Validade do cartão Obrigatorio")

         if(!inserir.Cvv)
           throw new Error("Cvv do cartão Obrigatorio")

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


export default endpoints;