
import { BuscarData_Compra, BuscarHorario_Compra, InserirData, InserirHorario } from "../../Repository/Produto/Datas_horariosRepository.js";

import { Router } from "express";
const endpoints  = Router()



endpoints.post('/data', async (req, resp) => {

    try {

        const inserirData = req.body
        
        const DataInserida = await InserirData(inserirData)

        
        resp.send(DataInserida)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})



endpoints.post('/horario', async (req, resp) => {

    try {

        const horarioInserir = req.body
        
        const horarioInserido = await InserirHorario(horarioInserir)

        
        resp.send(horarioInserido)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})




endpoints.get('/data/compra/:id', async (req, resp) => {

    try {

        const {id} = req.params
        
        const resposta = await BuscarData_Compra(id)

        if(resposta.length === 0) 
            throw new Error('Nehuma data ou horário encontrada para este ingresso')
        
        resp.send(resposta)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})


endpoints.get('/horario/compra/:id', async (req, resp) => {

    try {

        const {id} = req.params
        
        const resposta = await BuscarHorario_Compra(id)

        if(resposta.length === 0) 
            throw new Error('Nehuma data ou horário encontrada para este ingresso')
        
        resp.send(resposta)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})


export default endpoints;