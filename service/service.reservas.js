import reporeservas from '../repositories/repository.reservas.js'

async function ManagerReservas(id_user){
    const reservas = await reporeservas.ManagerReservas(id_user)
    return reservas
}
async function Listar(id_user){
    const reservas = await reporeservas.Listar(id_user) 
    return reservas
}
async function Inserir (id_mecanico,services,booking_date,booking_hour,id_user){
    const reservas = await reporeservas.Inserir(id_mecanico,services,booking_date,booking_hour,id_user) 
    return reservas
}
async function Edit(id_appointment,id_mecanico,id_service,booking_date,booking_hour){
    const reservas = await reporeservas.Edit(id_appointment,id_mecanico,id_service,booking_date,booking_hour)
    return reservas
}
async function Filter(booking_date_begin,booking_date_end,filtermecanico){
    const filter = await reporeservas.Filter(booking_date_begin,booking_date_end,filtermecanico)
    return filter
}
async function HorariosCheck(id_mecanico,booking_date){
    const checkhora = await reporeservas.HorariosCheck(id_mecanico,booking_date)
    return checkhora
}
async function Delete(id_appointment){
    const reservas = await reporeservas.Delete(id_appointment) 
    return reservas
}

export default {ManagerReservas, Listar, Inserir,Edit,Filter,HorariosCheck, Delete}