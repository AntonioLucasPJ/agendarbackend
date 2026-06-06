import { query } from "../database/sqlite.js"

async function CreateClientVehicle(id_user, model_id, license_plate, color) {
    let sql = `
    INSERT INTO vehicle_clients(id_user,model_id,license_plate,color) VALUES
    (?,?,?,?)
    returning id
    `
    const singupvehicle = await query(sql, [id_user, model_id, license_plate, color])
    return singupvehicle
}

async function Search() {
    let sql = `
    SELECT * 
    FROM brands
    `
    const reservas = await query(sql)
    return reservas
}
async function SearchModels(id_brands) {
    let sql = `
    SELECT * 
    FROM vehicle_models
    WHERE brands_id =?
    `
    const reservas = await query(sql, id_brands)
    return reservas
}

export default { CreateClientVehicle, Search, SearchModels, }