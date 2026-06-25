import serviceVehicle from '../service/service.vehicle.js';
import servicevehicle from '../service/service.vehicle.js'
import repositoryVehicle from '../repositories/repository.vehicle.js';
async function ManagerVehicle(req, res) {
    const managervehicle = await servicevehicle.ManagerVehicle()
    res.status(200).json(managervehicle)
}
async function CreateClientVehicle(req, res) {

    const { user_id, model_id, car_license_plate, color } = req.body;
    const checklicenseplate = await repositoryVehicle.SearchLicensePLate(car_license_plate)
    if (checklicenseplate == '') {
        const singupvehicle = await servicevehicle.CreateClientVehicle(user_id, model_id, car_license_plate, color)
        return res.status(200).json({ message: 'Veiculo Cadastro com Sucesso', singupvehicle })
    }
    res.status(302).json({ message: 'Ja existe veiculo no banco cadatrado com essa Placa' })

}

async function CreateModelVehicle(req, res) {
    const { brand, model, ano, image } = req.body;
    const vehiclemodels = await servicevehicle.CreateModelVehicle(brand, model, ano, image)
    res.status(200).json({ message: `Veiculo cadastrado`, vehiclemodels })
}
async function EditModel(req, res) {
    const { id } = req.params;
    const { model, year, status } = req.body;
    const edimodel = await servicevehicle.EditModel(id, model, year, status)
    res.status(200).json({ message: 'Dados alterados', edimodel })
}
async function DeleteModelVehicle(req, res) {
    const { id } = req.params;
    const check = await repositoryVehicle.SearchConnectClientVehicle(id)
    if (check == '') {
        console.log(check)
        const deletevehiclemodel = await serviceVehicle.DeleteModelVehicle(id)
        return res.status(200).json({ message: `veiculo deletado` })
    }
    res.status(302).json({message:'Veiculo possui usuarios vinculados'})
}

async function DeleteClientVehicle(req, res) {
    const { id } = req.params;
    const deleteclientvehicle = await serviceVehicle.DeleteClientVehicle(id)
    res.status(200).json({ message: `Veiculo removido com sucesso` })
}
async function Search(req, res) {
    const reservas = await servicevehicle.Search()
    res.status(200).json(reservas)
}
async function SearchModels(req, res) {
    const { id_brands } = req.body
    const models = await servicevehicle.SearchModels(id_brands)
    res.status(200).json(models)
}
async function SearchVehicleClients(req, res) {
    const { id_user } = req.params;
    const vehicle_clients = await serviceVehicle.SearchVehicleClients(id_user)
    res.status(200).json(vehicle_clients)
}
export default { CreateClientVehicle, CreateModelVehicle, EditModel, DeleteModelVehicle, DeleteClientVehicle, Search, SearchModels, SearchVehicleClients, ManagerVehicle }