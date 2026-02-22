import { query } from "../database/sqlite.js"
async function Inserir(name, email,telefone, hashpassword) {
    let sql = `
    INSERT INTO users(name, email,telefone, password) VALUES(?,?,?,?)
    returning id_user`
    const createuser = await query(sql, [name, email,telefone, hashpassword])
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
async function Profile(id_user){
    
    let sql =  'SELECT * FROM  users WHERE id_user =?'
    const profile = await query(sql,[id_user])
    return profile[0]
}
export default {Inserir, ListarEmail, Profile}