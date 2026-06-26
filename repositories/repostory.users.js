import { query } from "../database/sqlite.js"
async function Inserir(name, email,cpf,telefone, hashpassword) {
    let sql = `
    INSERT INTO users(name, email,cpf,telefone, password) VALUES(?,?,?,?,?)
    returning id_user`
    const createuser = await query(sql, [name, email,cpf,telefone, hashpassword])
    return createuser[0];
}
async function ListarEmail(email){
    let sql = `
    SELECT * FROM users where email =?`
    const user = await query(sql,[email])
    if(user.length ==0){
        return []
    }
    return user[0]
}
async function ListarCPF(cpf){
    let sql = `
    SELECT * FROM users where cpf=?`
    const user = await query(sql,[cpf])
    if(user.length ==0){
        return []
    }
    return user[0]
}
async function Profile(){
    let sql =  'SELECT * FROM  users '
    const profile = await query(sql)
    return profile
}
async function Edit(id_user,name,email,cpf,telefone){
    console.log(name,email,cpf,telefone,id_user)
    let sql = `
        UPDATE users
        SET name =?,
        Email=?,
        CPF =?,
        Telefone =?
        WHERE id_user =?
    `
    const edituser = await query(sql,[name,email,cpf,telefone,id_user])
    return 'Usuario Atualizado'
}
export default {Inserir, ListarEmail,ListarCPF, Profile, Edit}