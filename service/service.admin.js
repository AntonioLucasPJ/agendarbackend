import bcrypt from 'bcrypt'
import repositoryAdmin from '../repositories/repository.admin.js'
import token from '../token.js'
export async function Create(name, email, telefone, password) {
    const validar = await repositoryAdmin.ListarEmail(email)
    if (validar.length == 0) {
        const hashpassword = await bcrypt.hash(password, 10)
        const admin = repositoryAdmin.Create(name, email, telefone, hashpassword)
        admin.token = token.CreateToken(admin.token)
        return admin
    }else {
        return "Email já cadastrado no banco"
    }
}
export async function Login(email, password) {
    const admin = await repositoryAdmin.ListarEmail(email)
    if (admin.length == 0) {
        return 'Usuario não existe no banco'
    } else {
        if (await bcrypt.compare(password, admin.password)) {
            delete admin.password;
            admin.token = token.CreateToken(admin.id_admin)
            return admin
        } else {
            return 'Senha incorreta'
        }
    }
}
export default { Create, Login }