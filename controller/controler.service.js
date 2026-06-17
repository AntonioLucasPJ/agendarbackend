import repositoryServices from "../repositories/repository.services.js";
import servicessearch from "../service/service.services.js";

async function CreateServices(req, res) {
    const { service, description, icone_id } = req.body;
    const checkservice = await repositoryServices.CheckServices(service,description)
    if(checkservice.length >0){
        return res.status(300).json({message:"Ja existe um servico cadastro com as mesma caracteres"})
    }
    const createret = await servicessearch.CreateServices(service, description, icone_id)

    res.status(200).json({ message: `Servico cadastrado com sucesso n° ${createret.id_service}` })
}
async function SearchServices(req, res) {
    const search = await servicessearch.SearchServices()
    res.status(200).json(search)
}
async function EditServices(req, res) {
    const { id_service } = req.params
    const { service, description, icone_id, status } = req.body;
    const editservice = await servicessearch.EditServices(id_service, service, description, icone_id, status)
    res.status(200).json({ message: 'O servico foi atualizado' })
}

async function DeleteService(req, res) {
    const { id_service } = req.params;
    const consultid = await repositoryServices.SearchdeleteService(id_service)
    if (consultid.length > 0) {
        const deleteservice = await servicessearch.DeleteService(id_service)
        return res.status(200).json({ message: 'O servico foi deletado' })
    }
    res.status(300).json({message:"Servico ja deletado no banco"})


}
export default { SearchServices, CreateServices, EditServices, DeleteService }