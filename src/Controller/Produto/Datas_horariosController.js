
import { BuscarData_Compra, BuscarData_CompraId, BuscarHorario_Compra, DeletarData, DeletarHorario, InserirData, InserirHorario } from "../../Repository/Produto/Datas_horariosRepository.js";

import { Router } from "express";
const endpoints  = Router()



endpoints.post('/data', async (req, resp) => {

    try {

        const inserirDate = req.body

        if(!inserirDate.Ingresso)
            throw new Error('Insira um id de Ingresso!')

        if(!inserirDate.Data)
            throw new Error('Campo de data vazio insira ao menos uma data!')


        
        const DataInserida = await InserirData(inserirDate)

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


endpoints.get('/data/horario/:id', async (req, resp) => {

    try {

        const {id} = req.params
        
        const resposta = await BuscarData_CompraId(id)

        if(resposta.length === 0) 
            throw new Error('Nehuma data ou horário encontrada para este ingresso')
        
        resp.send(resposta)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})


endpoints.delete('/data/:id', async (req, resp) => {
    try {
        
        const {id} = req.params

        const deletar = await DeletarData(id)

        if(deletar == 0)
            throw new Error('Data não pode ser deletada');
        
        resp.status(204).send()

    } catch (err) {
        resp.status(400).send({
            erro: err.message
       })
    }
})



endpoints.delete('/horario/:id', async (req, resp) => {
    try {
        
        const {id} = req.params

        const deletar = await DeletarHorario(id)

        if(deletar == 0)
            throw new Error('Horário não pode ser deletado');
        
        resp.status(204).send()

    } catch (err) {
        resp.status(400).send({
            erro: err.message
       })
    }
})


export default endpoints;