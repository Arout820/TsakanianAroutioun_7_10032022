import { useState } from 'react';
import nonValideImage from '../../assets/non_valide.png';

const Signup = ({ setLoginModal, setSignupModal }) => {
  // Création des variables affichés modifiables
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordReapeat] = useState('');

  // Création des variables d'erreurs affichés modifiables
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeatError, setPasswordReapeatError] = useState('');
  const [duplicateEmail, setDuplicateEmail] = useState('');

  // --------------------------VALIDATION ----------------------------- //

  // Déclaration de test
  const [firstnameValid, setFirstnameValid] = useState(false);
  const [lastnameValid, setLastnameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const [passwordMinMaxValid, setPasswordMinMaxValid] = useState(false);
  const [passwordUppercaseValid, setPasswordUppercaseValid] = useState(false);
  const [passwordLowercaseValid, setPasswordLowercaseValid] = useState(false);
  const [passwordDigitsValid, setPasswordDigitsValid] = useState(false);

  const regexFirstname = /^[a-zA-ZÀ-Ÿ]{0,200}[a-zA-ZÀ-Ÿ]$/g;
  const regexLastname = /^[a-zA-ZÀ-Ÿ]{0,200}[a-zA-ZÀ-Ÿ]$/g;
  const regexEmail = /^[a-zA-Z][a-zA-Z0-9.-]{2,85}@[a-zA-Z0-9]{2,84}\.[a-zA-Z]{2,84}$/g;

  const regexPasswordMinMax = /[a-zA-Z0-9]{5,50}/g;
  const regexPasswordUppercase = /[A-Z]/g;
  const regexPasswordLowercase = /[a-z]/g;
  const regexPasswordDigits = /[\d]{2,}/g;

  // validation fonction pour prénom, nom, mail
  const validation = (regex, string, validity) => {
    if (!regex.test(string)) {
      return validity(false);
    }
    validity(true);
  };

  const validationPassword = (string) => {
    if (!regexPasswordMinMax.test(string)) {
      setPasswordMinMaxValid(false);
    } else {
      setPasswordMinMaxValid(true);
    }
    if (!regexPasswordUppercase.test(string)) {
      setPasswordUppercaseValid(false);
    } else {
      setPasswordUppercaseValid(true);
    }
    if (!regexPasswordLowercase.test(string)) {
      setPasswordLowercaseValid(false);
    } else {
      setPasswordLowercaseValid(true);
    }
    if (!regexPasswordDigits.test(string)) {
      setPasswordDigitsValid(false);
    } else {
      setPasswordDigitsValid(true);
    }
  };

  const HandleChangeFirstname = (event) => {
    setFirstname(event.target.value);
    validation(regexFirstname, event.target.value, setFirstnameValid);
  };

  const HandleChangeLastname = (event) => {
    setLastname(event.target.value);
    validation(regexLastname, event.target.value, setLastnameValid);
  };

  const HandleChangeEmail = (event) => {
    setEmail(event.target.value);
    validation(regexEmail, event.target.value, setEmailValid);
  };

  const HandleChangePassword = (event) => {
    setPassword(event.target.value);
    validationPassword(event.target.value);
  };

  // ------------------------- INSCRIPTION --------------------------- //
  const HandleSignup = (event) => {
    event.preventDefault();

    // test regex et si tout ok on envoie l'inscription
    if (!firstnameValid) {
      setFirstnameError("Le prénom n'est pas valide !");
    }

    if (!lastnameValid) {
      setLastnameError("Le nom de famille n'est pas valide !");
    }

    if (!emailValid) {
      setEmailError("L'email n'est pas valide !");
    }

    if (!passwordDigitsValid || !passwordLowercaseValid || !passwordMinMaxValid || !passwordUppercaseValid) {
      setPasswordError("Le mot de passe n'est pas valide");
    }

    if (password !== passwordRepeat) {
      setPasswordReapeatError('Les mots de passe ne correspondent pas');
    }

    if (
      firstnameValid &&
      lastnameValid &&
      emailValid &&
      passwordDigitsValid &&
      passwordLowercaseValid &&
      passwordMinMaxValid &&
      passwordUppercaseValid &&
      password === passwordRepeat
    ) {
      const signupInfos = { firstname, lastname, email, password };

      fetch('http://localhost:5000/api/user/signup', {
        method: 'POST',
        body: JSON.stringify(signupInfos),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(async (res) => {
        try {
          const contenu = await res.json();
          if (contenu.error) {
            setDuplicateEmail(
              'Une personne avec ce mail est déjà inscrit sur le site, veuillez utiliser un autre mail merci !'
            );
          } else {
            setSignupModal(false);
            setLoginModal(true);
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  };

  return (
    <form onSubmit={HandleSignup} method="post" className="form-auth">
      <h1 className="form-auth__name">Inscription rapide</h1>
      <div className="form-auth__element">
        <input
          type="text"
          id="firstname"
          className={firstnameError && !firstnameValid ? 'error-border' : undefined}
          placeholder="Prénom"
          onChange={HandleChangeFirstname}
          value={firstname}
          maxLength="50"
          autoComplete="off"
        />
        {firstnameError && !firstnameValid && (
          <div className="error">
            <div className="error__image">
              <img src={nonValideImage} alt="" />
            </div>
            <div className="error__message">{firstnameError}</div>
          </div>
        )}
      </div>

      <div className="form-auth__element">
        <input
          type="text"
          id="lastname"
          className={lastnameError && !lastnameValid ? 'error-border' : undefined}
          placeholder="Nom de famille"
          onChange={HandleChangeLastname}
          value={lastname}
          maxLength="50"
          autoComplete="off"
        />
        {lastnameError && !lastnameValid && (
          <div className="error">
            <div className="error__image">
              <img src={nonValideImage} alt="" />
            </div>
            <div className="error__message">{lastnameError}</div>
          </div>
        )}
      </div>

      <div className="form-auth__element">
        <input
          type="text"
          id="email"
          className={emailError && !emailValid ? 'error-border' : undefined}
          placeholder="Email"
          onChange={HandleChangeEmail}
          value={email}
          maxLength="255"
          autoComplete="email"
        />
        {emailError && !emailValid && (
          <div className="error">
            <div className="error__image">
              <img src={nonValideImage} alt="" />
            </div>
            <div className="error__message">{emailError}</div>
          </div>
        )}
      </div>

      <div className="form-auth__element">
        <input
          type="password"
          id="password"
          className={
            passwordError &&
            (!passwordDigitsValid || !passwordLowercaseValid || !passwordMinMaxValid || !passwordUppercaseValid)
              ? 'error-border'
              : undefined
          }
          placeholder="Mot de passe"
          onChange={HandleChangePassword}
          value={password}
          maxLength="50"
          autoComplete="new-password"
          title="Le mot de passe doit contenir entre 5 et 50 caractères maximum, une majuscule, une minuscule, et
          deux chiffres."
        />
        {passwordError &&
          (!passwordDigitsValid || !passwordLowercaseValid || !passwordMinMaxValid || !passwordUppercaseValid) && (
            <div className="error">
              <div className="error__image">
                <img src={nonValideImage} alt="" />
              </div>
              <div className="error__message">{passwordError}</div>
            </div>
          )}
      </div>

      <div className="form-auth__element">
        <input
          type="password"
          id="password-reapeat"
          className={passwordRepeatError && passwordRepeat !== password ? 'error-border' : undefined}
          autoComplete="on"
          placeholder="Répétez le mot de passe"
          onChange={(event) => setPasswordReapeat(event.target.value)}
          value={passwordRepeat}
          maxLength="50"
        />
        {passwordRepeatError && passwordRepeat !== password && (
          <div className="error">
            <div className="error__image">
              <img src={nonValideImage} alt="" />
            </div>
            <div className="error__message">{passwordRepeatError}</div>
          </div>
        )}
      </div>
      {(password || passwordError) && (
        <div className="form-auth__password-check">
          <p className={passwordMinMaxValid ? 'checked-regex' : undefined}>5 caractères minimum </p>
          <p className={passwordUppercaseValid ? 'checked-regex' : undefined}>1 caractère majuscule</p>
          <p className={passwordLowercaseValid ? 'checked-regex' : undefined}>1 caractère minuscule</p>
          <p className={passwordDigitsValid ? 'checked-regex' : undefined}>2 caractères numériques</p>
        </div>
      )}
      <button type="submit" id="signup" className="form-auth__button">
        Créer un compte
      </button>
      <div className="form-auth__duplicate">{duplicateEmail}</div>
    </form>
  );
};

export default Signup;
