import express from 'express'
import controllermecanicos from './controller/controler.mecanicos.js'
import controlleusers from './controller/controler.users.js'
import controlerAppointments from './controller/controler.appointments.js'
import controlerAdmin from './controller/controler.admin.js'
import token from './token.js'
import controlerVehicle from './controller/controler.vehicle.js'
import controlerService from './controller/controler.service.js'
export const routes = express.Router()

//Mecanicos
routes.get("/mecanicos",token.ValidateToken,controllermecanicos.Listar)
routes.post("/mecanicos",token.ValidateToken,controllermecanicos.Inserir)
routes.put("/mecanicos/:id",token.ValidateToken,controllermecanicos.Edit)
routes.delete("/mecanicos/delete/:id",token.ValidateToken,controllermecanicos.Delet)
routes.get("/mecanicos/:id/services",token.ValidateToken,controllermecanicos.ListarServicos)

//Users
routes.post('/users/singup',controlleusers.Inserir)
routes.post('/users/login',controlleusers.Login)
routes.get('/users/profile',token.ValidateToken,controlleusers.Profile)

//Reservas
routes.get('/appointements',token.ValidateToken,controlerAppointments.Reservas)
routes.post('/appointements',token.ValidateToken,controlerAppointments.Inserir)
routes.put('/appointments/edit/:id_appointment',token.ValidateToken,controlerAppointments.Edit)
routes.post('/appointments/filter',token.ValidateToken,controlerAppointments.Filter)
routes.delete('/appointments/delete/:id_appointment',token.ValidateToken,controlerAppointments.Delete)
routes.post('/appointements/check',token.ValidateToken,controlerAppointments.HorariosCheck)
            
//Vehicle
routes.get('/vehicle/brands',token.ValidateToken,controlerVehicle.Search)
routes.post('/vehicle/models',token.ValidateToken,controlerVehicle.SearchModels)
routes.post('/vehicle/singupvehicle',token.ValidateToken,controlerVehicle.CreateClientVehicle)
routes.post('/vehicle/modelvehicle',token.ValidateToken,controlerVehicle.CreateModelVehicle)
routes.post('/vehicle/searchvehicle/:id_user',token.ValidateToken,controlerVehicle.SearchVehicleClients)
routes.put('/vehicle/:id',token.ValidateToken,controlerVehicle.EditModel)
routes.delete('/vehicle/delete/:id',token.ValidateToken,controlerVehicle.DeleteModelVehicle)
routes.delete('/vehicle/clientdelete/:id',token.ValidateToken,controlerVehicle.DeleteClientVehicle)

//Manager Web
routes.get('/appointmentsall',token.ValidateToken,controlerAppointments.ManagerReservas)
routes.get('/vehiclesall',token.ValidateToken,controlerVehicle.ManagerVehicle)

//Services
routes.get('/servicessearch',token.ValidateToken,controlerService.SearchServices)
routes.post('/servicessearch',token.ValidateToken,controlerService.CreateServices)
routes.put('/servicessearch/:id_service',token.ValidateToken,controlerService.EditServices)
routes.delete('/servicessearch/:id_service',token.ValidateToken,controlerService.DeleteService)

//Administradores
routes.post("/admin",controlerAdmin.Create) 
routes.post("/admin/login",controlerAdmin.Login)