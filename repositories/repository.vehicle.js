import { query } from "../database/sqlite.js"

async function ManagerVehicle(){
    let sql = `
    SELECT 
    vehicle_models.id,
    brands.imagem_url AS logo,
    brands.name AS brand,
    vehicle_models.name AS model,
    vehicle_models.image_url AS car 
    FROM brands
    INNER JOIN vehicle_models ON vehicle_models.brands_id = brands.id
    `
    const check = await query(sql)
    return check
}
async function CreateClientVehicle(id_user, model_id, license_plate, color) {
    let sql = `
    INSERT INTO vehicle_clients(id_user,model_id,license_plate,color) VALUES
    (?,?,?,?)
    returning id
    `
    const singupvehicle = await query(sql, [id_user, model_id, license_plate, color])
    return singupvehicle
}
async function CreateModelVehicle(brand, model,ano, image) {
    let sql = `
    INSERT INTO vehicle_models(brands_id,name,year,image_url) VALUES
    (?,?,?,?)
    returning id
    `
    const vehiclemodels = await query(sql, [brand, model,ano, image])
    return vehiclemodels
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

async function SearchVehicleClients(id_user) {
    let sql = `
        SELECT 
        brands.name AS brand,
        brands.imagem_url,
        vehicle_models.name AS model,
        vehicle_models.image_url AS imagemcar,
        vehicle_clients.id,
        vehicle_clients.id_user,
        vehicle_clients.license_plate,
        vehicle_clients.color
        FROM vehicle_clients
        INNER JOIN vehicle_models  on vehicle_models.id = vehicle_clients.model_id
        INNER JOIN brands on vehicle_models.brands_id = brands.id 
        WHERE id_user = ?
        `
    const searchvehicle = await query(sql, id_user)
    return searchvehicle
}
export default { CreateClientVehicle,CreateModelVehicle, Search, SearchModels, SearchVehicleClients,ManagerVehicle }