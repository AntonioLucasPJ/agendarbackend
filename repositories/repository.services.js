import { query } from "../database/sqlite.js";

async function CreateServices(service,description,icone_id){
    let sql = `
        INSERT INTO services (service,description,icone_id,status) VALUES
        (?,?,?,'A')
        returning id_service
    `
    const createservice = await query(sql,[service,description,icone_id])
    return createservice
}


async function EditServices(id_service,service,description,icone_id){
    let sql = `
        update services 
        set service=?, 
        description=?,
        icone_id =? 
        where id_service = ?
        returning id_service
    `
    const editservice  = await query(sql,[service,description,icone_id,id_service])
    return editservice
}
async function SearchServices(){
    let sql = `
        SELECT * 
        FROM services
    `
    const service = await query(sql)
    return service
}


export default {CreateServices,SearchServices,EditServices}