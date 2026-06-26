import bcrypt from 'bcrypt'
import Repouser from '../repositories/repostory.users.js'
import jsonwebtoken from 'jsonwebtoken'
import token from '../token.js'
import repostoryUsers from '../repositories/repostory.users.js'

async function ManagerReservas(id_user) {
    const reservas = await Repouser.ManagerReservas(id_user)
    return reservas
}
async function Inserir(name, email, cpf, telefone, password) {
    const validar = await Repouser.ListarCPF(cpf)
    const validar2 = await Repouser.ListarEmail(email)
    console.log(`${validar} e ${validar2}`)
    if (validar == 0 && validar2 == 0) {
        const hashpassword = await bcrypt.hash(password, 10)
        const user = await Repouser.Inserir(name, email, cpf, telefone, hashpassword)
        user.token = token.CreateToken(user.id_user)
        return user
    }
    return 'Já existe este CPF ou email cadastrado na base'
}
async function Login(email, password) {
    const user = await Repouser.ListarEmail(email)
    if (user.length == 0) {
        return []
    } else {
        if (await bcrypt.compare(password, user.password)) {
            delete user.password;
            user.token = token.CreateToken(user.id_user)
            return user
        } else {
            return []
        }
    }
}
async function Edit(id_user){
    const edit = await repostoryUsers.Edit(id_user)
    return edit
}
async function Profile() {
    const profile = await repostoryUsers.Profile()
    delete profile.password
    return profile
}


export default { ManagerReservas, Inserir, Login, Edit,Profile }