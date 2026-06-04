import servicevehicle from '../service/service.vehicle.js'
async function Search(req,res){
    const reservas = await servicevehicle.Search()
    res.status(200).json(reservas)
}

export default {Search}