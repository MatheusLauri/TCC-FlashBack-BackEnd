
import { Router } from "express";
import { InserirEmpresa, ListIngresso, ListarEmpresas, login, InserirFormulario, AprovaçãoPost, ListForm, ReprovarCadastro} from "../../Repository/Users/EmpresaRepository.js";

import axios from "axios";

const endpoints  = Router()

// quando arrumar as validações dos clientes faço essa!

endpoints.post('/empresa', async (req, resp) => {

    try {

        const InserirNovaEmpresa = req.body

        const empresaInserida = await InserirEmpresa(InserirNovaEmpresa)

    
        if(!empresaInserida.NM_RAZAO_SOCIAL)
            throw new Error ("Razão social Obrigatorio")

        if(!empresaInserida.DS_CNPJ)
            throw new Error ("CNPJ Obrigatorio")

        if(!empresaInserida.DS_EMAIL_EMPRESA)
            throw new Error ("Email Obrigatorio")

        if(!empresaInserida.DS_SENHA_EMPRESA)
            throw new Error ("Senha Obrigatoria")

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

endpoints.get('/empresas', async (req,resp) => {
    try {
        
        const resposta = await ListarEmpresas()

        if (resposta.length == 0)
            resp.status(404).send([])
        else
            resp.send(resposta)


    } catch (err) {
        resp.status(400).send({
            erro: err.message
       })
    }
})

endpoints.get('/IngressoPorEmpresa', async (req,resp) => {
    try {
        
        const {id, evento } = req.query

        
        const list = await ListIngresso(id, evento)

        resp.send(list)
    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
})




endpoints.post('/formulario', async (req,resp) => {
    try {
        
        const {cnpj, senha} = req.body

        const url = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`)
        
        const razao = url.data.fantasia
        const email = url.data.email

        const resposta = await InserirFormulario(cnpj,razao, email, senha)

        resp.send(resposta)
    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
})



endpoints.post('/Aprovacao', async (req,resp) =>{
    try {
            
        const {id} = req.body
        const resposta = await AprovaçãoPost(id)

        const inserir = await InserirEmpresa(resposta)

        const deletar = await ReprovarCadastro(id)

        resp.send(inserir)
        
    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
})



endpoints.get('/listForm', async (req,resp) => {
    try {
        
        const listagem = await ListForm()

        resp.send(listagem)

    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
})


endpoints.delete('/FormularioDel/:id', async (req,resp) => {
    try {
        
        const {id} = req.params

        const deletar = await ReprovarCadastro(id)

        resp.status(204).send()
    } catch (err) {
        resp.status(400).send({
            erro: err.message
       }) 
    }
})
export default endpoints;