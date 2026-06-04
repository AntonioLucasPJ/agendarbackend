import { query } from "../database/sqlite.js"
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
    const reservas = await query(sql,id_brands)
    return reservas
}
export  default {Search,SearchModels}