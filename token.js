import jwt from 'jsonwebtoken'

const secretetoken = "JORNADAJS123"

function CreateToken(id) {
    const token = jwt.sign({ id }, secretetoken, {
        expiresIn: 500000,
    });
    return token
}
function ValidateToken(req, res, next) {
    const authtoken = req.headers.authorization;
    if (!authtoken) {
        return res.status(401).json({ error: "Token não informado" })
    }
    const [, token] = authtoken.split(' ')

    const validate = jwt.verify(token, secretetoken, (error, tokendecode) => {
        if (error) {
            return res.status(401).json({ error: "Token invalido" })
        }
        req.id_user = tokendecode.id
        
        next();
    });
}
export default { CreateToken, ValidateToken }