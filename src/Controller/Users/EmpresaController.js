
import { Router } from "express";
import { InserirEmpresa } from "../../Repository/Users/EmpresaRepository.js";


const endpoints  = Router()



endpoints.post('/empresa', async (req, resp) => {

    try {

        const InserirNovaEmpresa = req.body

        const empresaInserida = await InserirEmpresa(InserirNovaEmpresa)

        resp.send(empresaInserida)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})


export default endpoints;