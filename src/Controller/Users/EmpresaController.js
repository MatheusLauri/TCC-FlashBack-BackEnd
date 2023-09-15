
import { Router } from "express";
import { InserirEmpresa, login } from "../../Repository/Users/EmpresaRepository.js";


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


endpoints.post('/empresa/login', async (req, resp) => {

    try {
        
        const { cnpj, email, senha,} = req.body
        const resposta = await login( cnpj, email, senha)

        if(!resposta)   
            throw new Error("Crendencias invalidas")

        resp.send(resposta)
        
    }
    catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }

})

export default endpoints;