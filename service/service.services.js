import repositoriesService from '../repositories/repository.services.js'


async function CreateServices(service,description,icone_id){
    const createservice = await repositoriesService.CreateServices(service,description,icone_id)
    return createservice
}
async function SearchServices(){
    const search = await repositoriesService.SearchServices()
    return search
}

async function EditServices(id_service,service,description,icone_id){
    const editservice  = await repositoriesService.EditServices(id_service,service,description,icone_id)
    return editservice
}
export default {SearchServices,CreateServices,EditServices}