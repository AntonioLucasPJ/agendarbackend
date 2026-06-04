import { query } from "../database/sqlite.js"
async function Search() {
    let sql = `
    SELECT * 
    FROM brands
    `
    const reservas = await query(sql)
    return reservas
}
export  default {Search}