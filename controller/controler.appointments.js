import serviceReservas from "../service/service.reservas.js";
async function ManagerReservas(req,res){
    const {id_user} = req;
    const reservas = await serviceReservas.ManagerReservas(id_user)
    res.status(200).json(reservas)
}
async function Reservas(req,res){
    const {id_user} = req;
    const reservas = await serviceReservas.Listar(id_user)
    res.status(200).json(reservas)
}
async function Inserir(req,res){
    const {id_user} = req;
    const {id_mecanico,id_service,booking_date,booking_hour} =  req.body;
    const reservas = await serviceReservas.Inserir(id_mecanico,id_service,booking_date,booking_hour,id_user)
    res.status(201).json({message:'Reserva cadastrada!!'})
}
async function Edit(req,res){
    const {id_appointment} = req.params;
    const {id_mecanico,id_service,booking_date,booking_hour} = req.body;
    const reservas = await serviceReservas.Edit(id_appointment,id_mecanico,id_service,booking_date,booking_hour)
    res.status(200).json({message:`${reservas}`})
}
async function Delete(req,res){
    const {id_user}= req;
    const {id_appointment} = req.params;
    const reservas = await serviceReservas.Delete(id_user,id_appointment)
    res.status(200).json(reservas)
}
export default {ManagerReservas, Reservas, Inserir,Edit, Delete}