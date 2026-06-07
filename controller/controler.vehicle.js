import serviceVehicle from '../service/service.vehicle.js';
import servicevehicle from '../service/service.vehicle.js'


async function CreateClientVehicle(req,res){
    const {id_user,model_id,license_plate,color} = req.body;
    const singupvehicle = await servicevehicle.CreateClientVehicle(id_user,model_id,license_plate,color)
    res.status(200).json({message:'Veiculo Cadastro com Sucesso',singupvehicle})
}

async function Search(req,res){
    const reservas = await servicevehicle.Search()
    res.status(200).json(reservas)
}
async function SearchModels(req,res){
    const {id_brands} = req.body
    const models = await servicevehicle.SearchModels(id_brands)
    res.status(200).json(models)
}
async function SearchVehicleClients(req,res){
    const {id_user} = req
    const vehicle_clients = await serviceVehicle.SearchVehicleClients(id_user)
    res.status(200).json(vehicle_clients)
}
export default {CreateClientVehicle, Search,SearchModels,SearchVehicleClients}