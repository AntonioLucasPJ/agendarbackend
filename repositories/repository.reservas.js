import { query } from "../database/sqlite.js"


async function ManagerReservas(id_user) {
    let sql = `
    SELECT 
    A.id_appointment,
    group_concat(S.service,', ') as service,
    M.name as mecanico,
    M.services as especializacao,
    A.booking_date,
    A.booking_hour,
    US.name as client,
    A.status
    from appointments A
    JOIN mecanicos M on M.id_mecanico = A.id_mecanico
    JOIN users US on US.id_user = A.id_user
    JOIN appointment_services APS on APS.id_appointment =  A.id_appointment
    JOIN services S on S.id_service = APS.id_service 
    GROUP BY A.id_appointment   
    order by A.booking_date, A.booking_hour
    `
    const reservas = await query(sql)
    return reservas
}
async function Listar(id_user) {
    let sql = `
        SELECT 
        A.id_appointment,
        A.booking_date,
        A.booking_hour,
        group_concat(S.service,', ') AS service,
        A.status
        from appointments A
        JOIN appointment_services APS ON APS.id_appointment = A.id_appointment
        JOIN services S ON S.id_service = APS.id_service 
        WHERE A.id_user =?
        GROUP BY A.id_appointment
        order by A.booking_date, A.booking_hour

    `
    const reservas = await query(sql, [id_user])
    return reservas
}
async function Inserir(id_mecanico, services, booking_date, booking_hour, id_user) {
    let listaservicos = Array.isArray(services) ? services : JSON.parse(services)
    let sql = `
    INSERT INTO appointments(id_mecanico,id_user,booking_date,booking_hour) VALUES(?,?,?,?)
    returning id_appointment`
    const reservas = await query(sql, [id_mecanico, id_user, booking_date, booking_hour])
    const id_appointment = reservas[0].id_appointment

    if (!Array.isArray(listaservicos)) {
        if (!listaservicos) {
            listaservicos = []
        } else {
            listaservicos = [listaservicos]
        }
    }
    if (listaservicos.length > 0) {
        for (const idserviceatual of listaservicos) {
            // const idFinal = typeof idserviceatual === 'object'&& idserviceatual.id_service !==null
            // ?(idserviceatual.id_service || idserviceatual.id): idserviceatual
            let sqlserv = `
                INSERT INTO appointment_services(id_appointment,id_service)
                VALUES(?,?)
                RETURNING id_appointment_service
            `
            let servicesappointments = await query(sqlserv, [id_appointment, idserviceatual])
            console.log(`${servicesappointments} - Servico inserido na tabela de appointments_service`)
        }
    }
    return reservas
}
async function Edit(id_appointment, id_mecanico, id_service, booking_date, booking_hour) {
    let sql = `
        update appointments set id_mecanico=?, id_service=?, booking_date =?, booking_hour = ? where id_appointment = ?
    `
    const reservas = await query(sql, [id_mecanico, id_service, booking_date, booking_hour, id_appointment])
    return `Agendamento n° ${id_appointment} foi alterado!!!`
}
async function Filter(booking_date_begin, booking_date_end, filtermecanico) {
    let sql = ''
    if (filtermecanico > 0) {
        sql = `
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
            WHERE A.booking_date >= ? AND A.booking_date <= ?
            AND M.id_mecanico = ?
            order by A.booking_date, A.booking_hour
        `
        const filter = await query(sql, [booking_date_begin, booking_date_end, filtermecanico])
        return filter
    } else {
        sql = `
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
            WHERE A.booking_date >= ? AND A.booking_date <= ?
            order by A.booking_date, A.booking_hour
    `
        const filter = await query(sql, [booking_date_begin, booking_date_end])
        return filter
    }
}
async function HorariosCheck(id_mecanico, booking_date) {
    let sql = `
    SELECT
    booking_hour
    from appointments
    where id_mecanico = ? AND booking_date = ?
    `
    const checkhora = await query(sql, [id_mecanico, booking_date])
    return checkhora
}
async function Delete(id_appointment) {
    let deleteappointment = `
    DELETE FROM appointments
    where  id_appointment =?`
    let deleteappointment_services = `
    DELETE FROM appointment_services
    where  id_appointment =?`
    const deletereserva = await query(deleteappointment, [id_appointment])
    const deleteapointmentreserva = await query(deleteappointment_services, [id_appointment])
    return `Agendamento n°${id_appointment} Excluido com sucesso`
}

export default { ManagerReservas, Listar, Inserir, Edit, Filter, HorariosCheck, Delete }