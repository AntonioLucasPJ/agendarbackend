import { reverse } from 'dns'
import reporeservas from '../repositories/repository.reservas.js'

async function ManagerReservas(id_user){
    const reservas = await reporeservas.ManagerReservas(id_user)
    return reservas
}
async function Listar(id_user){
    const reservas = await reporeservas.Listar(id_user) 
    return reservas
}
async function Inserir (id_mecanico,id_service,booking_date,booking_hour,id_user){
    const reservas = await reporeservas.Inserir(id_mecanico,id_service,booking_date,booking_hour,id_user) 
    return reservas
}
async function Edit(id_appointment,id_mecanico,id_service,booking_date,booking_hour){
    const reservas = await reporeservas.Edit(id_appointment,id_mecanico,id_service,booking_date,booking_hour)
    return reservas
}
async function Delete(id_user,id_appointment){
    const reservas = await reporeservas.Delete(id_user,id_appointment) 
    return reservas
}

export default {ManagerReservas, Listar, Inserir,Edit, Delete}