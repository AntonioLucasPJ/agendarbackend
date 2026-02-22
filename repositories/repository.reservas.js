import { query } from "../database/sqlite.js"


async function ManagerReservas(id_user) {
    let sql = `
   SELECT 
    A.id_appointment as id_appointment,
    S.description as service,
    M.name as mecanico,
    M.specialty as especializacao,
    MS.price,
    A.booking_date,
    A.booking_hour,
    US.name as client
    from appointments A
    JOIN mecanicos M on M.id_mecanico = A.id_mecanico
    JOIN services S on S.id_service = A.id_service
    JOIN users US on US.id_user = A.id_user
    JOIN mecanicos_services MS on MS.id_mecanico =  A.id_mecanico
    AND MS.id_service = A.id_service
    order by A.booking_date, A.booking_hour
    `
    const reservas = await query(sql)
    return reservas
}
async function Listar(id_user) {
    let sql = `
    SELECT 
    A.id_appointment,
    S.description as service,
    M.name as mecanico,
    M.specialty as especializacao,
    MS.price,
    A.booking_date,
    A.booking_hour,
    US.name as client
    from appointments A
    JOIN mecanicos M on M.id_mecanico = A.id_mecanico
    JOIN services S on S.id_service = A.id_service
    JOIN users US on US.id_user = A.id_user
    JOIN mecanicos_services MS on MS.id_mecanico =  A.id_mecanico
    AND MS.id_service = A.id_service
    WHERE A.id_user = ?
    order by A.booking_date, A.booking_hour
    `
    const reservas = await query(sql, [id_user])
    return reservas
}
async function Inserir(id_mecanico, id_service, booking_date, booking_hour, id_user) {
    let sql = `
    INSERT INTO appointments(id_mecanico, id_service,id_user,booking_date,booking_hour) VALUES(?,?,?,?,?)
    returning id_user`
    const reservas = await query(sql, [id_mecanico, id_service, id_user, booking_date, booking_hour])
    return reservas
}
async function Edit(id_appointment, id_mecanico, id_service, booking_date, booking_hour) {
    let sql = `
        update appointments set id_mecanico=?, id_service=?, booking_date =?, booking_hour = ? where id_appointment = ?
    `
    const reservas = await query(sql,[id_mecanico,id_service,booking_date,booking_hour,id_appointment])
    return `Agendamento n° ${id_appointment} foi alterado!!!`
}
async function Delete(id_user, id_appointment) {
    let sql = `
    DELETE FROM appointments
    where id_user =?
    AND id_appointment =?`
    const reservas = await query(sql, [id_user, id_appointment])
    return `Agendamento n°${id_appointment} Excluido com sucesso`
}

export default { ManagerReservas, Listar, Inserir, Edit, Delete }