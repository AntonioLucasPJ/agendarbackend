import { query } from "../database/sqlite.js"
import token from "../token.js"

async function Create(name, email, telefone, hashpassword) {
    let sql =
        `INSERT INTO admins(name,email,telefone,password) VALUES(?,?,?,?)
    returning id_admin,name,email,telefone,password`
    const admin = await query(sql, [name, email, telefone, hashpassword])
    admin[0].token = token.CreateToken(admin.id_admin)
    return (admin[0])
}
async function ListarEmail(email) {
    let sql = `SELECT *  FROM admins WHERE email = ?`
    const admin = await query(sql, [email])
    if (admin.length == 0) {
        return []
    }
    return admin[0]

}

export default { Create, ListarEmail }