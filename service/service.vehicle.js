import repositoryVehicle from '../repositories/repository.vehicle.js'
async function Search(){
    const reservas = await repositoryVehicle.Search() 
    return reservas
}
export default {Search}