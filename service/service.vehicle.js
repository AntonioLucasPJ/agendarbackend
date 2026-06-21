import repositoryVehicle from '../repositories/repository.vehicle.js'

async function ManagerVehicle(){
    const managervehicle = await repositoryVehicle.ManagerVehicle()
    return managervehicle
}
async function CreateClientVehicle(id_user,model_id,license_plate,color){
    const singupvehicle = await repositoryVehicle.CreateClientVehicle(id_user,model_id,license_plate,color) 
    return singupvehicle
}
async function CreateModelVehicle(brand,model,ano,image){
    const vehiclemodels = await repositoryVehicle.CreateModelVehicle(brand,model,ano,image)
    return vehiclemodels
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
export default {CreateClientVehicle,CreateModelVehicle,Search,SearchModels,SearchVehicleClients,ManagerVehicle}