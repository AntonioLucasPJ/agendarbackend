import repositoryVehicle from '../repositories/repository.vehicle.js'
async function Search(){
    const reservas = await repositoryVehicle.Search() 
    return reservas
}
async function SearchModels(id_brands){
    const models = await repositoryVehicle.SearchModels(id_brands)
    return models
}
export default {Search,SearchModels}