import { Router } from "express";

import { login } from "../../Repository/Users/AdmRespository.js";

const endpoints  = Router()


endpoints.post('/adm/login', async (req, resp) => {

    try {
        
        const { email, senha,} = req.body
        const resposta = await login(email, senha)
        if(!email)   
            throw new Error("É necessário inserir o e-mail.")

        if(!senha)   
            throw new Error("É necessário inserir uma senha.")

        if(!resposta)   
            throw new Error("Crendenciais inválidas")

        resp.send(resposta)
        
    }
    catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
    
})
    

export default endpoints;