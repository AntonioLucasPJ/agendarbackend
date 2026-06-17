
import { query } from "../database/sqlite.js"
async function Listar(name) {
    //Simula o acesso ao banco
    let filtro = [];
    let sql = `select 
    id_mecanico,
    name,
    titulo_profissional,
    services,
    genero,
    avatar_url,
    avaliacao,
    experiencia,
    telefone,
    email,
    descricao,
    cpf,
    ativo
    from mecanicos `
    if (name) {
        sql = sql + 'where name like ? ';
        filtro.push('%' + name + '%')
    }
    sql = sql + ' order by name'
    const mecanicos = await query(sql, filtro)
    return mecanicos
}

async function Create(name, services, genero, titulo_profissional, avatar_url, experiencia, telefone, email, descricao, cpf) {
    let listaservicos = [];
    try {
        if(Array.isArray(services)){
            console.log(services)
            listaservicos = services
        } else if (typeof services === 'string' && services.trim()!== ''){
            const parsed = JSON.parse(services)
            listaservicos = Array.isArray(parsed) ? parsed :[parsed]
        }else if ( typeof services === 'number'){
            listaservicos = [services]
        }
    }catch(error){
        if( typeof services === 'string'){
            listaservicos = [parseInt(services,10)]
        }
    }
    const checkname = await Listar(name)
    if (checkname.length >= 1) {
        return 'Usuario ja existe na base'
    } else {
        try {
            //Simula o acesso ao banco
            let sql = `
        INSERT INTO MECANICOS(name,services,genero,ativo,titulo_profissional,avatar_url,avaliacao,experiencia,telefone,email,descricao,cpf) 
        VALUES(?,?,?,'A',?,?,0,?,?,?,?,?)
        returning id_mecanico
        `
            const createmecanicos = await query(sql, [name, listaservicos, genero, titulo_profissional, avatar_url, experiencia, telefone, email, descricao, cpf])
            let id = createmecanicos[0].id_mecanico
            let msg = `ID -${id}  usuario cadastro no banco`
            if (listaservicos.length > 0) {
                for (const id_service of listaservicos) {
                    let sqlservices= `
            INSERT INTO mecanicos_services(id_mecanico,id_service)VALUES
            (?,?)
            returning id_mecanico_service
            `
                    let createidservice = await query(sqlservices, [id, id_service])
                    let msg2 = 'Usuario cadastrado no BD' + createmecanicos[0].id_mecanico_service
                }

            }
            return 'Usuario Cadastrado no banco'
        } catch (error) {
            return error
        }

    }
}


async function Edit(id, name, speality, icon) {
    //Simula o acesso ao banco
    let sql = `update mecanicos set name=?,specialty=?,icon=? WHERE id_mecanico =?`
    await query(sql, [name, speality, icon, id])
    return { id }
}
async function Delet(id) {
    //Simula o acesso ao banco
    let deletemecanico = `delete from mecanicos where id_mecanico =?`
    let deleteservice =`delete from mecanicos_services where id_mecanico=?`
    await query(deletemecanico, [id])
    await query(deleteservice,[id])
    return { id }
}
async function ListarServicos(id) {
    let sql = `
    SELECT S.id_service,S.service,S.description,S.icone_id
    FROM mecanicos_services M
    JOIN services S on (S.id_service = M.id_service)
    where m.id_mecanico =?
    AND S.status != 'I'
    order by S.description
`
    const services = await query(sql, [id])

    return services
}
export default { Listar, Create, Edit, Delet, ListarServicos }