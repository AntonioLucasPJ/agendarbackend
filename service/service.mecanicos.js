import RepoMecanico from '../repositories/repository.mecanico.js'
async function Listar(name) {
    const mecanicos = await RepoMecanico.Listar(name)
    return mecanicos
}
async function Create(name, speality, icon) {
    const mecanicos = await RepoMecanico.Create(name, speality, icon)
    return mecanicos
}

async function Edit(id,name, speality, icon) {
    const mecanicos = await RepoMecanico.Edit(id,name, speality, icon)
    return mecanicos
}
async function Delet(id){
    const mecanicos = await RepoMecanico.Delet(id)
    return mecanicos
}
async function ListarServicos(id){
    const servicos = await RepoMecanico.ListarServicos(id)
    return servicos
}
export default { Listar, Create, Edit, Delet, ListarServicos}