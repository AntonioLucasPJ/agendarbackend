import serviceAdmin from "../service/service.admin.js";
async function Create(req, res) {
    const { name, email, telefone, password } = req.body;
    const admin = await serviceAdmin.Create(name, email, telefone, password);
    if (admin.token) {
        return res.status(200).json(admin)
    }else {
        return res.status(401).json({message:`${admin}`})
    }
}
async function Login(req, res) {
    const { email, password } = req.body;
    const admin = await serviceAdmin.Login(email, password)
    if (admin.token) {
        return res.status(200).json(admin)
    } else {
        return res.status(401).json({message:`${admin}`})
    }

}
export default { Create, Login }