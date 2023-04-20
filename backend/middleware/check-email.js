// Validatore permet la vérification de l'email
const validator = require('validator');

module.exports = (req, res, next) => {
    
    const {email} = req.body;

    if( validator.isEmail(email)){
        console.log("--> validator.isEmail");
        console.log('email valide');
        next();
    }else{
        return res.status(400).json({ message :  `error: mail ${email} non valide`})
    }
}