const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

// prettier-ignore
passwordSchema
    .not().is().min(5, "Le mot de passe doit contenir au moins 5 caractères")                                   
    .not().is().max(50, "Le mot de passe ne peut pas contenir plus de 50 caractères")                                                                 
    .not().has().digits(2, "Le mot de passe doit contenir au moins 2 chiffres")
    .not().has().uppercase(1, "Le mot de passe doit contenir une majuscule")
    .not().has().lowercase(1, "Le mot de passe doit contenir une minuscule")
    .has().not().spaces()                          
    .is().not().oneOf(['Passw0rd', 'Password123']);
// prettier-ignore

// Comparaison avec le password envoyé
module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
      console.log("Le mot de passe est valide !");
    next();
  } else {
    console.log('test');
    return res
      .status(401)
      .json({ error: passwordSchema.validate(req.body.password, { details: true }) });
  }
};
