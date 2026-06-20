import { setServers } from 'dns'
import serviceMecanico from '../service/service.mecanicos.js'
import repositoryMecanico from '../repositories/repository.mecanico.js'
async function Listar(req, res) {
    const { name,ativo } = req.query
    const mecanicos = await serviceMecanico.Listar(name,ativo)
    res.status(200).json(mecanicos)
}
async function Inserir(req, res) {
    const { name, services, genero, titulo_profissional, avatar_url, experiencia, telefone, email, descricao, cpf } = req.body;
    const mecanicos = await serviceMecanico.Create(name, services, genero, titulo_profissional, avatar_url, experiencia, telefone, email, descricao, cpf)
    res.status(201).json({message:`${mecanicos}`})
}
async function Edit(req, res) {
    const { id } = req.params;
    const {name, services, genero, titulo_profissional, avatar_url, experiencia, telefone, email, descricao, cpf,ativo } = req.body;
    const mecanico = await serviceMecanico.Edit(id,name, services, genero, titulo_profissional, avatar_url, experiencia, telefone, email, descricao, cpf,ativo)
    res.status(200).json({message:'Cadastro Editado com sucesso', mecanico })
}
async function Delet(req, res) {
    const { id } = req.params;
    const checkappointmentmecanico = await repositoryMecanico.CheckAppointmentMecanicos(id)
    console.log(checkappointmentmecanico)
    let testect = checkappointmentmecanico.length >0 
    console.log(testect)
    if (checkappointmentmecanico.length >0){
        console.log(checkappointmentmecanico)
        let listappointmentmec = []
        for (let checkappoint of checkappointmentmecanico){
            listappointmentmec.push(checkappoint.id_appointment)
        }
        return res.status(400).json({message:`O mecanico possui os agendamentos n° ${listappointmentmec} vinculados`})
    }
    const mecanico = await serviceMecanico.Delet(id)
    res.status(200).json(mecanico)
}

async function ListarServicos(req, res) {
    const { id } = req.params;
    const servicos = await serviceMecanico.ListarServicos(id)
    if (servicos !=='') {
        return res.status(200).json(servicos)
    }
    res.status(404).json({message:"Mecanico não possui serviços disponiveis"})

}
export default { Listar, Inserir, Edit, Delet, ListarServicos }