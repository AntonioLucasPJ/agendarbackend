import { query } from "../database/sqlite.js"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
async function ManagerVehicle() {
    let sql = `
    SELECT 
    vehicle_models.id,
    brands.imagem_url AS logo,
    brands.id AS id_brand,
    brands.name AS brand,
    vehicle_models.name AS model,
    vehicle_models.image_url AS car,
    vehicle_models.year,
    vehicle_models.status
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
async function CreateModelVehicle(brand, model, ano, image) {
    let sql = `
    INSERT INTO vehicle_models(brands_id,name,year,image_url,status) VALUES
    (?,?,?,?,'A')
    returning id
    `
    const vehiclemodels = await query(sql, [brand, model, ano, image])
    return vehiclemodels
}
async function EditModel(id, model, year,status) {
    let sql = `
    UPDATE  
    vehicle_models
    set name=?,
    year=?,
    status=?
    WHERE id=?
    returning id
    `
    const vehiclemodels = await query(sql, [model, year, status,id])
    return vehiclemodels
}
async function DeleteModelVehicle(id) {
    let sqlconsult = `
    SELECT image_url FROM vehicle_models
    WHERE id =?
    `
    const vehiclemodels = await query(sqlconsult, [id])
    if (vehiclemodels) {
        try {
            const link = vehiclemodels[0].image_url
            const partesURL = link.split('/')
            const nomecomextensao = partesURL.pop();
            const publicid = nomecomextensao.split('.')[0]
            await cloudinary.uploader.destroy(publicid);
            console.log(`Imagem deletada no banco de dados`)

        } catch (clouderro) {
            console.error('Aviso: Falha ao deletar no Cloudnary', clouderro.message);
        }
        let sqldeletevehicle = `
            DELETE FROM 
            vehicle_models
            WHERE id =?
        `
        const deletevehicle = await query(sqldeletevehicle, [id])

    }
    return "Veiculo deletado"
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
export default { CreateClientVehicle, CreateModelVehicle,EditModel, DeleteModelVehicle, Search, SearchModels, SearchVehicleClients, ManagerVehicle }