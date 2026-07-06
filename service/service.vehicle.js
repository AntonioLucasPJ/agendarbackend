import repositoryVehicle from '../repositories/repository.vehicle.js'

async function ManagerVehicle(){
    const managervehicle = await repositoryVehicle.ManagerVehicle()
    return managervehicle
}
async function CreateClientVehicle(user_id,model_id,car_license_plate,color){
    const singupvehicle = await repositoryVehicle.CreateClientVehicle(user_id,model_id,car_license_plate,color) 
    return singupvehicle
}
async function CreateModelVehicle(brand,model,ano,image){
    const vehiclemodels = await repositoryVehicle.CreateModelVehicle(brand,model,ano,image)
    return vehiclemodels
}
async function EditModel(id, model, year,status){
    const editmodel = await repositoryVehicle.EditModel(id, model, year,status)
    return editmodel
}
async function DeleteModelVehicle(id){
    const deletevehiclemodel = await repositoryVehicle.DeleteModelVehicle(id)
    return deletevehiclemodel
}
async function DeleteClientVehicle(id){
    const deletevehicleclient = await repositoryVehicle.DeleteClientVehicle(id)
    return deletevehicleclient
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
async function EditVehicleClients(id, license_plate, color){
    const editclients = await repositoryVehicle.EditVehicleClients(id, license_plate, color)
    return editclients
}
export default {CreateClientVehicle,CreateModelVehicle,EditModel,DeleteModelVehicle,DeleteClientVehicle,Search,SearchModels,SearchVehicleClients,EditVehicleClients,ManagerVehicle}