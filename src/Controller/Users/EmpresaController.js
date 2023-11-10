
import { Router } from "express";
import { InserirEmpresa, ListIngresso, login } from "../../Repository/Users/EmpresaRepository.js";


const endpoints  = Router()

// quando arrumar as validações dos clientes faço essa!

endpoints.post('/empresa', async (req, resp) => {

    try {

        const InserirNovaEmpresa = req.body

        if(!InserirNovaEmpresa.CNPJ)
            throw new Error('CNPJ Obrigatorio!')

        if(!InserirNovaEmpresa.RazaoSocial)
            throw new Error('Razão Social Obrigatorio!')

        if(!InserirNovaEmpresa.Email)
            throw new Error('Email Obrigatorio!')

        if(!InserirNovaEmpresa.Senha)
            throw new Error('Senha Obrigatorio!')


        const empresaInserida = await InserirEmpresa(InserirNovaEmpresa)

        if(empresaInserida.length > 0)
            throw new Error('empresa já inserida');


        resp.send(empresaInserida)
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })     
    }
})


endpoints.post('/empresa/login', async (req, resp) => {

// n consegui fazer que nem o login cliente, falta esses dois 
    try {
        
        const { cnpj, email, senha,} = req.body
        
        const resposta = await login(cnpj, email, senha)

        if(!cnpj && !email)   
            throw new Error("É necessário inserir um cnpj ou email")

        if(!senha)   
            throw new Error("É necessário inserir uma senha")

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



endpoints.get('/IngressoPorEmpresa', async (req,resp) => {
    try {
        
        const {id} = req.query

        const list = await ListIngresso(id)

        resp.send(list)
    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
})
export default endpoints;