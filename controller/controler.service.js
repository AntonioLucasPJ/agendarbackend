import servicessearch from "../service/service.services.js";

async function CreateServices(req, res){
    const {service,description,icone_id} = req.body;
    const createret = await servicessearch.CreateServices(service,description,icone_id)
    res.status(200).json({message:`Servico cadastrado com sucesso n° ${createret}`})
}
async function SearchServices(req, res){
    const search = await servicessearch.SearchServices()
    res.status(200).json(search)
}
async function EditServices(req, res){
    const {id_service} = req.params
    const {service,description,icone_id} = req.body;
    const editservice  = await servicessearch.EditServices(id_service,service,description,icone_id)
    res.status(200).json(editservice)
}

export default {SearchServices, CreateServices,EditServices}