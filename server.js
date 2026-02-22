import express from 'express'
import cors from 'cors'
import { routes } from './routes.js'
const app = express()
app.use(express.json())
app.use(cors())
app.use(routes) 
const PORT = 3000   
app.use(routes)
app.listen(PORT,()=>{
    console.log(`Servidor run in PORT ${PORT}`)
})