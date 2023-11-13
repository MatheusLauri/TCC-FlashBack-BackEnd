import { Router } from "express";

import { CompraPorData, ListarClientes, ListarCompraUF, ListarEmpresa, TodasCompras, compraPorCategoria, login } from "../../Repository/Users/AdmRespository.js";

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


endpoints.get('/empresasList',  async (req,resp) =>{ 
    try {
        
        const empresas = await ListarEmpresa()

        resp.send(empresas)

    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
})

endpoints.get('/clientesList', async (req,resp) =>{

    try {
        
        const clientes = await ListarClientes()

        resp.send(clientes)
        
    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }

})
    

endpoints.get('/ufList', async (req,resp) => {
    try {
        
        const {uf} = req.query

        const list = await ListarCompraUF(uf)

        resp.send(list)

    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
})



endpoints.get('/TodasCompras', async (req,resp) => {
    try {
        
        const list = await TodasCompras()

        resp.send(list)
    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
})

endpoints.get('/CompraData', async (req,resp) => {
    try {
        
        const {data} = req.query

        const list = CompraPorData(data)

        resp.send(list)

    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
})


endpoints.get('/CompraPorCategoria', async (req,resp) => {
    try {
        
        const {categoria} = req.query

        const cat = await compraPorCategoria(categoria)

        resp.send(cat)
    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
})
export default endpoints;