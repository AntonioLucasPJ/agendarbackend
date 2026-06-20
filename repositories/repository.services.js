import { query } from "../database/sqlite.js";

async function Checkappointment(id){
    let sql = `
        SELECT 
        appointment_services.id_appointment
        FROM services
        JOIN appointment_services ON  appointment_services.id_service = services.id_service
        WHERE services.id_service =?
    `
    const checkappointmentservices = await(sql,[id])
    return checkappointmentservices            
}
async function CreateServices(service, description, icone_id) {
    let sql = `
        INSERT INTO services (service,description,icone_id,status) VALUES
        (?,?,?,'A')
        returning id_service
    `
    const createservice = await query(sql, [service, description, icone_id])
    return createservice
}

async function CheckServices(service, description) {
    let sql = `
     SELECT 
        id_service,
        service,
        description 
        FROM services
        WHERE service =? OR description = ?
    `
    const checkservice = await query(sql, [service, description])
    return checkservice
}
async function EditServices(id_service, service, description, icone_id, status) {
    let sql = `
        update services 
        set service=?, 
        description=?,
        icone_id =?,
        status =?
        where id_service = ?
        returning id_service
    `
    const editservice = await query(sql, [service, description, icone_id, status, id_service])
    return editservice
}
async function SearchServices(ativo) {
    if (ativo !== undefined) {
        let sql = `
        SELECT *    
        FROM services
        WHERE status =?
        `
        const service = await query(sql,[ativo])
        return service
    }
    let sql = `
        SELECT * 
        FROM services
    `
    const service = await query(sql)
    return service
}

async function DeleteServices(id_service) {
    let sql = `
        DELETE FROM services
        WHERE id_service =?
    `
    const deleteservice = await query(sql, [id_service])
    return deleteservice
}


async function SearchdeleteService(id_service) {
    let sql = `
    SELECT * 
    FROM services
    WHERE id_service = ?
    `
    const consutsearch = await query(sql, [id_service])
    return consutsearch
}

export default { CheckServices, CreateServices, SearchServices, EditServices, SearchdeleteService, DeleteServices,Checkappointment }