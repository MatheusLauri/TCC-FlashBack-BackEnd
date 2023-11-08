

import { alterarLocal, inserirLocal } from "../../Repository/Produto/LocalEventoRepository.js";

import { Router } from "express";
const endpoints  = Router()


endpoints.post('/local', async (req, resp) => {

    try {

        const novoLocal = req.body

        
        if(!novoLocal.CEP)
            throw new Error("CEP obrigatorio")
        
        if(!novoLocal.Logradouro)
            throw new Error("Logradouro obrigatorio")

        if(!novoLocal.Bairro)
            throw new Error("Bairro obrigatorio")

        if(!novoLocal.Localidade)
            throw new Error("Localidade obrigatorio")

        if(!novoLocal.UF)
            throw new Error("UF obrigatorio")

        if(!novoLocal.Numero)
            throw new Error("Numero obrigatorio")


        const localInserido = await inserirLocal(novoLocal)
        resp.send(localInserido)
        
    } catch (err) {
        
        resp.status(404).send({
            erro: err.message
        })  

    }
})



endpoints.put('/local/:id', async (req, resp) => {

    try {

        const {id} = req.params

        const localAlterar = req.body

        if(!localAlterar.CEP)
        throw new Error("CEP obrigatorio")
    
        if(!localAlterar.Logradouro)
            throw new Error("Logradouro obrigatorio")

        if(!localAlterar.Bairro)
            throw new Error("Bairro obrigatorio")

        if(!localAlterar.Localidade)
            throw new Error("Localidade obrigatorio")

        if(!localAlterar.UF)
            throw new Error("UF obrigatorio")

        if(!localAlterar.Numero)
            throw new Error("Numero obrigatorio")

        const localAlterado = await alterarLocal(id, localAlterar)

        resp.status(204).send()
        
    } catch (err) {
        
        resp.status(404).send({
            erro: err.message
        })  

    }
})



export default endpoints;