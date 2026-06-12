import servicosusers from '../service/service.users.js'
async function Inserir(req, res) {
    const { name, email,cpf,telefone, password } = req.body;
    const users = await servicosusers.Inserir(name, email,cpf,telefone, password)
    if(users =="Já existe este CPF ou email cadastrado na base"){
        res.status(302).json(users)
    }
    res.status(200).json(users)
}
async function Login(req, res) {
    const { email, password } = req.body;
    const users = await servicosusers.Login(email, password)
    if (users.length == 0) {
        res.status(401).json({ message: 'Email ou senha não encontrado!!' })
    } else {
        res.status(200).send(users)
    }
}
async function Profile(req,res){
    const profile = await servicosusers.Profile()
    res.status(200).json(profile)
}
export default { Inserir, Login, Profile }