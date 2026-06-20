import repositoriesService from '../repositories/repository.services.js'


async function CreateServices(service,description,icone_id){
    const createservice = await repositoriesService.CreateServices(service,description,icone_id)
    return createservice
}
async function SearchServices(ativo){
    const search = await repositoriesService.SearchServices(ativo)
    return search
}

async function EditServices(id_service,service,description,icone_id,status){
    const editservice  = await repositoriesService.EditServices(id_service,service,description,icone_id,status)
    return editservice
}
async function DeleteService(id_service){
    const deleteservice = await repositoriesService.DeleteServices(id_service)
    return deleteservice
}
export default {SearchServices,CreateServices,EditServices,DeleteService}