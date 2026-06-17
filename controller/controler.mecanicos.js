import { setServers } from 'dns'
import serviceMecanico from '../service/service.mecanicos.js'
async function Listar(req, res) {
    const { name } = req.query
    const mecanicos = await serviceMecanico.Listar(name)
    res.status(200).json(mecanicos)
}
async function Inserir(req, res) {
    const { name, specialty, icon,titulo_profissional,avatar_url,experiencia,telefone,email,descricao,cpf } = req.body;
    const mecanicos = await serviceMecanico.Create(name, specialty, icon,titulo_profissional,avatar_url,experiencia,telefone,email,descricao,cpf)
    res.status(201).json({message:`${mecanicos}`})
}
async function Edit(req, res) {
    const { id } = req.params;
    const { name, speality, icon } = req.body;
    const mecanico = await serviceMecanico.Edit(id, name, speality, icon)
    res.status(200).json({ mecanico })
}
async function Delet(req, res) {
    const { id } = req.params;
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