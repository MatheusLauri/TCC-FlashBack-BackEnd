
import 'dotenv/config'

import ClienteController from './Controller/Users/ClienteController.js'
import EmpresaController from './Controller/Users/EmpresaController.js'
import IngressoController from './Controller/Produto/IngressoController.js'


import cors from 'cors'
import express from 'express'


const server = express()

server.use(cors())
server.use(express.json())

server.use(ClienteController)
server.use(EmpresaController)
server.use(IngressoController)

server.listen(process.env.PORT, 
            () => console.log(`A API está funcionando na porta ${process.env.PORT}`))

