//Importation bcrypt pour hasher le MDP
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken');
const User = require('../models/User');
// Importation crypto-js pour chiffrer le mail:
const cryptoJs = require('crypto-js');

exports.signup = (req, res, next) =>{
    //Crypto 512bit plus long mais meilleur efficacité
    const emailCrypto = cryptoJs.HmacSHA512(req.body.email, 'CLE_SECRET').toString();
    // console.log('---> CRYPTOJS controllers/user');
    // console.log(emailCrypto);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User ({
                email : emailCrypto,
                    password : hash
            });
            user.save()
                .then(() => res.status(201).json({ message : 'Utilisateur crée !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch ( error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    const emailCrypto = cryptoJs.HmacSHA512(req.body.email, 'CLE_SECRET').toString();
    User.findOne({ email: emailCrypto })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            //hashe le MPD avant de l'envoyer avec une exécussion de salt = 10 pour exécuter 10fois l'algo de hashage 
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(    
                            {userId: user._id},
                            process.env.SECRET_TOKEN,
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };