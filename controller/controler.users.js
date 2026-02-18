import servicosusers from '../service/service.users.js'
async function Inserir(req, res) {
    const { name, email, password } = req.body;
    const users = await servicosusers.Inserir(name, email, password)
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
    const {id_user} =  req;
    const profile = await servicosusers.Profile(id_user)
    res.status(200).json({profile})
}
export default { Inserir, Login, Profile }