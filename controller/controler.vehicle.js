import serviceVehicle from '../service/service.vehicle.js';
import servicevehicle from '../service/service.vehicle.js'

async function ManagerVehicle(req,res){
    const managervehicle = await servicevehicle.ManagerVehicle()
    res.status(200).json(managervehicle)
}
async function CreateClientVehicle(req,res){
    const {id_user,model_id,license_plate,color} = req.body;
    const singupvehicle = await servicevehicle.CreateClientVehicle(id_user,model_id,license_plate,color)
    res.status(200).json({message:'Veiculo Cadastro com Sucesso',singupvehicle})
}

async function CreateModelVehicle(req,res){
    const {brand,model,ano,image} = req.body;
    const vehiclemodels = await servicevehicle.CreateModelVehicle(brand,model,ano,image)
    res.status(200).json({message:`Veiculo cadastrado`,vehiclemodels})
}
async function EditModel(req,res){
    const {id} = req.params;
    const {model,year,status} = req.body;
    const edimodel = await servicevehicle.EditModel(id,model,year,status)
    res.status(200).json({message:'Dados alterados',edimodel})
}
async function DeleteModelVehicle(req,res){
    const {id} = req.params;
    const deletevehiclemodel = await serviceVehicle.DeleteModelVehicle(id)
    res.status(200).json({message:`${deletevehiclemodel}`})
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
export default {CreateClientVehicle, CreateModelVehicle,EditModel, DeleteModelVehicle,Search,SearchModels,SearchVehicleClients,ManagerVehicle}