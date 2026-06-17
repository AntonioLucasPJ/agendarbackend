import repositoryVehicle from '../repositories/repository.vehicle.js'

async function CreateClientVehicle(id_user,model_id,license_plate,color){
    const singupvehicle = await repositoryVehicle.CreateClientVehicle(id_user,model_id,license_plate,color) 
    return singupvehicle
}
async function Search(){
    const reservas = await repositoryVehicle.Search() 
    return reservas
}
async function SearchModels(id_brands){
    const models = await repositoryVehicle.SearchModels(id_brands)
    return models
}

async function SearchVehicleClients(id_user){
    const models = await repositoryVehicle.SearchVehicleClients(id_user)
    return models
}
export default {CreateClientVehicle,Search,SearchModels,SearchVehicleClients}