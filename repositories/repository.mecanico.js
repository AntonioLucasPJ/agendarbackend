
import { query } from "../database/sqlite.js"
async function Listar(name) {
    //Simula o acesso ao banco
    let filtro = [];
    let sql = `select * from mecanicos `
    if (name) {
        sql = sql + 'where name like ? ';
        filtro.push('%' + name + '%')
    }
    sql = sql + ' order by name'
    const mecanicos = await query(sql, filtro)
    return mecanicos
}

async function Create(name, speality, icon) {
    const checkname = await Listar(name)
    console.log(checkname)
    if (checkname.length >= 1) {
        return 'Usuario ja existe na base'
    } else {
        //Simula o acesso ao banco
        let sql = `
    INSERT INTO mecanicos(name,specialty,icon) VALUES(?,?,?)
    returning id_mecanico`
        const createmecanicos = await query(sql, [name, speality, icon])
        return createmecanicos
    }
}


async function Edit(id, name, speality, icon) {

    //Simula o acesso ao banco
    let sql = `update mecanicos set name=?,specialty=?,icon=? WHERE id_mecanico =?`
    await query(sql, [name, speality, icon,id])
    return { id }

}

async function Delet(id) {
    //Simula o acesso ao banco
    let sql = `delete from mecanicos where id_mecanico =?`
    await query(sql, [id])
    return { id }
}
async function ListarServicos(id){
    let sql = `
    SELECT S.id_service,S.description,M.price
    FROM mecanicos_services M
    JOIN services S on (S.id_service = M.id_service)
    where m.id_mecanico =?
    order by S.description
`
    const services = await query(sql,[id])
    return services
}
export default { Listar, Create, Edit, Delet, ListarServicos }