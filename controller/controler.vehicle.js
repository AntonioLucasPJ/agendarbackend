import servicevehicle from '../service/service.vehicle.js'
async function Search(req,res){
    const reservas = await servicevehicle.Search()
    res.status(200).json(reservas)
}
async function SearchModels(req,res){
    const {id_brands} = req.body
    const models = await servicevehicle.SearchModels(id_brands)
    res.status(200).json(models)
}

export default {Search,SearchModels}