import serviceReservas from "../service/service.reservas.js";
async function ManagerReservas(req,res){
    const {id_user} = req;
    const reservas = await serviceReservas.ManagerReservas(id_user)
    res.status(200).json(reservas)
}
async function Reservas(req,res){
    const {id_user} = req.params;
    const reservas = await serviceReservas.Listar(id_user)
    res.status(200).json(reservas)
}
async function Inserir(req,res){
    const {id_mecanico, services, booking_date, booking_hour, id_user} =  req.body;
    const reservas = await serviceReservas.Inserir(id_mecanico, services, booking_date, booking_hour, id_user)
    res.status(201).json({message:'Reserva cadastrada!!'})
}
async function Edit(req,res){
    const {id_appointment} = req.params;
    const {id_mecanico,id_service,booking_date,booking_hour} = req.body;
    const reservas = await serviceReservas.Edit(id_appointment,id_mecanico,id_service,booking_date,booking_hour)
    res.status(200).json({message:`${reservas}`})
}
async function Filter(req,res){
    const {booking_date_begin,booking_date_end,filtermecanico} =  req.body;
    const filter = await serviceReservas.Filter(booking_date_begin,booking_date_end,filtermecanico)
    return res.status(200).json(filter)
}
async function HorariosCheck(req,res){
    const {id_mecanico,booking_date} = req.body;
    const checkhora = await serviceReservas.HorariosCheck(id_mecanico,booking_date)
    return res.status(200).json(checkhora)
}
async function Delete(req,res){
    const {id_appointment} = req.params;
    const reservas = await serviceReservas.Delete(id_appointment)
    res.status(200).json(reservas)
}
export default {ManagerReservas, Reservas, Inserir,Edit,Filter,HorariosCheck, Delete}