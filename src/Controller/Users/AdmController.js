import { Router } from "express";

import { login } from "../../Repository/Users/AdmRespository";

const endpoints  = Router()

endpoints.post('/empresa/login', async (req, resp) => {

        try {
            
            const { cnpj, email, senha,} = req.body
            const resposta = await login(cnpj, email, senha)
    
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