import { Router } from "express";

import { CompraPorData, ListarClientes, ListarCompraUF, ListarEmpresa, PostApi, TodasCompras, compraPorCategoria, login } from "../../Repository/Users/AdmRespository.js";

import axios from "axios";
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



endpoints.post('/postCnpj', async (req,resp) => {
    try {
        
        const {cnpj, senha} = req.body

        const url = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`)
        
        const razao = url.data.fantasia
        const email = url.data.email

        const resposta = await PostApi(cnpj,razao, email, senha)

        resp.send(resposta)
    } catch (err) {
        resp.status(404).send ({
            erro: err.message
        })
    }
})


// select api 

// http://localhost:5000/getCnpj?cnpj=39739202000195

endpoints.get('/getCnpj', async (req, resp) => {
    try {
        const { cnpj } = req.query;

        if (!cnpj) {
            return resp.status(400).send({
                erro: 'O parâmetro "cnpj" é obrigatório.',
            });
        }

        // Fazer a requisição para a API externa
        const response = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`);

        // Verificar o status da resposta
        if (response.status === 200) {
            // A resposta foi bem-sucedida
            const data = response.data;
            resp.json(data);
        } else {
            // A resposta não foi bem-sucedida
            resp.status(response.status).send({
                erro: `Erro na requisição para a API externa. Status: ${response.status}`,
            });
        }
    } catch (err) {
        // Lidar com erros durante a execução
        console.error('Erro na requisição:', err);
        resp.status(500).send({
            erro: 'Erro interno do servidor.',
        });
    }
});


export default endpoints;