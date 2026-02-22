import express from 'express'
import controllermecanicos from './controller/controler.mecanicos.js'
import controlleusers from './controller/controler.users.js'
import controlerAppointments from './controller/controler.appointments.js'
import controlerAdmin from './controller/controler.admin.js'
import token from './token.js'
export const routes = express.Router()

//Mecanicos
routes.get("/mecanicos",token.ValidateToken,controllermecanicos.Listar)
routes.post("/mecanicos",token.ValidateToken,controllermecanicos.Inserir)
routes.put("/mecanicos/:id",token.ValidateToken,controllermecanicos.Edit)
routes.delete("/mecanicos/:id",token.ValidateToken,controllermecanicos.Delet)
routes.get("/mecanicos/:id/services",token.ValidateToken,controllermecanicos.ListarServicos)

//Users
routes.post('/users/singup',controlleusers.Inserir)
routes.post('/users/login',controlleusers.Login)
routes.get('/users/profile',token.ValidateToken,controlleusers.Profile)

//Reservas
routes.get('/appointements',token.ValidateToken,controlerAppointments.Reservas)
routes.post('/appointements',token.ValidateToken,controlerAppointments.Inserir)
routes.put('/appointments/edit/:id_appointment',token.ValidateToken,controlerAppointments.Edit)
routes.delete('/appointments/delete/:id_appointment',token.ValidateToken,controlerAppointments.Delete)

//Manager Web
routes.get('/appointmentsall',token.ValidateToken,controlerAppointments.ManagerReservas)

//Administradores
routes.post("/admin",controlerAdmin.Create) 
routes.post("/admin/login",controlerAdmin.Login)