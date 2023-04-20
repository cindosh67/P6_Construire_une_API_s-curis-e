//package password-validator pour le mot de pass afin de respecter des critères pour avoir des MDP fort
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(5)            //Min 5 caractères
.is().max(30)           //Max 30 caractères
.has().uppercase()      //Doit contenir des Maj
.has().lowercase()      //Doit contenir des Min
.has().digits(2)        //Doit contenir 2 chiffres
.has().not().spaces()   //Ne pas contenir d'éespace*

module.exports = (req, res ,next) => {
    if(!passwordSchema.validate(req.body.password)) {
        res.status(400).json({message: 'Le mot de passe doit faire au moins 5 caractères dont une majuscule, une miniscule, 2 chiffres et sans espace'})
    }else{
        next();
    }
}
