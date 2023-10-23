

import { InserirPedido } from "../../Repository/Produto/PedidoRepository.js";

import { Router } from "express";

const endpoints  = Router()


endpoints.post('/pedido', async (req, resp) =>{

    try {
        
    const NovoPedido = req.body

    const Pedido = await InserirPedido(NovoPedido)

    resp.send(Pedido)

    }catch (err) {
        resp.status(404).send({
            erro: err.message
        })  
    }


})



export default endpoints;