import bcrypt from 'bcrypt'
import Repouser from '../repositories/repostory.users.js'
import jsonwebtoken from 'jsonwebtoken'
import token from '../token.js'
import repostoryUsers from '../repositories/repostory.users.js'

async function ManagerReservas(id_user){
    const reservas = await Repouser.ManagerReservas(id_user)
    return reservas
}
async function Inserir(name, email, password){
    const hashpassword = await bcrypt.hash(password,10)
    const user = await Repouser.Inserir(name, email, hashpassword)
    user.token = token.CreateToken(user.id_user)
    return user
}
async function Login(email,password){
    const user = await Repouser.ListarEmail(email)
    if(user.length ==0){
        return []
    }else {
        if(await bcrypt.compare(password,user.password)){
            delete user.password;
            user.token = token.CreateToken(user.id_user)
            return user
        }else {
            return []
        }
    }
}
async function Profile(id_user){
    const profile = await  repostoryUsers.Profile(id_user)
    delete profile.password
    return profile
}
export default {ManagerReservas, Inserir, Login, Profile}