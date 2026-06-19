
import { query } from "../database/sqlite.js"
async function Listar(name) {
    //Simula o acesso ao banco
    let filtro = [];
    let sql = ` 
    SELECT 
    M.id_mecanico,
    M.name,
    M.titulo_profissional,
    group_concat(services.service,', ') as services,
    M.genero,
    M.cpf,
    M.email,
    M.telefone,
    M.avatar_url,
    M.avaliacao,
    M.experiencia,
    M.descricao,
    M.ativo
    FROM mecanicos M
    LEFT JOIN  mecanicos_services ON mecanicos_services.id_mecanico = M.id_mecanico 
    LEFT JOIN services ON services.id_service = mecanicos_services.id_service
    GROUP BY M.id_mecanico
 `
    if (name) {
        sql = sql + 'where M.name like ? ';
        filtro.push('%' + name + '%')
    }
    sql = sql + ' order by name'
    const mecanicos = await query(sql, filtro)
    return mecanicos
}

async function Create(name, services, genero, titulo_profissional, avatar_url, experiencia, telefone, email, descricao, cpf) {
    const listaservicos = Array.isArray(services) ? services : JSON.parse(services)
    const checkname = await Listar(name)
    if (checkname.length >= 1) {
        return 'Usuario ja existe na base'
    } else {
        try {
            //Simula o acesso ao banco
            let sql = `
        INSERT INTO MECANICOS(name,services,genero,ativo,titulo_profissional,avatar_url,avaliacao,experiencia,telefone,email,descricao,cpf) 
        VALUES(?,?,?,'1',?,?,0,?,?,?,?,?)
        returning id_mecanico
        `
            const createmecanicos = await query(sql, [name, listaservicos, genero, titulo_profissional, avatar_url, experiencia, telefone, email, descricao, cpf])
            let id = createmecanicos[0].id_mecanico
            let msg = `ID -${id}  usuario cadastro no banco`
            if (listaservicos.length > 0) {
                for (const id_service of listaservicos) {
                    let sqlservices = `
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


async function Edit(id, name, services, genero, titulo_profissional, avatar_url, experiencia, telefone, email, descricao, cpf, ativo) {
    const listaservicos = Array.isArray(services) ? services : JSON.parse(services)
    //Simula o acesso ao banco
    let sql = `update mecanicos 
    set name=?,
    services=?,
    genero=?,
    titulo_profissional=?,
    avatar_url=?,
    experiencia=?,
    telefone=?,
    email=?,
    descricao=?,
    cpf=?,
    ativo=?
    WHERE id_mecanico =?
    returning id_mecanico
    `
    const edit = await query(sql, [name, services, genero, titulo_profissional, avatar_url, experiencia, telefone, email, descricao, cpf, ativo, id])
    const id_mecanico = edit[0].id_mecanico
    let sql_delete = `
            DELETE FROM mecanicos_services
            WHERE id_mecanico =?
        `
    const deletemecanico_service = await query(sql_delete, [id_mecanico])
    if (listaservicos.length > 0) {
        for (const id_service of listaservicos) {
            let sqlservices = `
            INSERT INTO  mecanicos_services(id_mecanico,id_service) VALUES
            (?,?)
            returning id_mecanico_service
            `
            let createidservice = await query(sqlservices, [id_mecanico, id_service])
            let msg2 = 'Usuario cadastrado no BD' + id_mecanico
        }

    }
    return { id }
}
async function Delet(id) {
    //Simula o acesso ao banco
    let deletemecanico = `delete from mecanicos where id_mecanico =?`
    let deleteservice = `delete from mecanicos_services where id_mecanico=?`
    await query(deletemecanico, [id])
    await query(deleteservice, [id])
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