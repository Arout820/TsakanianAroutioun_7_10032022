import { useState } from 'react';

const Signup = ({ setLoginModal, setSignupModal }) => {
  // Création des variables affichés modifiables
  const [firstname, setFirstname] = useState(undefined);
  const [lastname, setLastname] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [passwordRepeat, setPasswordReapeat] = useState(undefined);

  // Création des variables erros saffichés modifiables
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeatError, setPasswordReapeatError] = useState('');

  // fonction pour la logique du bouton inscription
  const HandleSignup = async (event) => {
    event.preventDefault();

    // selection des inputs pour du CSS
    const firstnameID = document.querySelector('#firstname');
    const lastnameID = document.querySelector('#lastname');
    const emailID = document.querySelector('#email');
    const passwordID = document.querySelector('#password');
    const passwordRepeatID = document.querySelector('#password-repeat');

    // séléction des div errors
    const firstnameErrorStyle = document.querySelector('#firstname-error');
    const lastnameErrorStyle = document.querySelector('#lastname-error');
    const emailErrorStyle = document.querySelector('#email-error');
    const passwordErrorStyle = document.querySelector('#password-error');
    const passwordRepeatErrorStyle = document.querySelector('#password-repeat-error');

    // données à envoyer
    const signupInfos = { firstname, lastname, email, password };
    console.log(signupInfos);

    // test mot de passe et si ok on envoie
    if (password !== passwordRepeat) {
      setPasswordReapeatError('Les mots de passe ne correspondent pas.');
      passwordRepeatErrorStyle.classList.add('input-message-error');
    } else {
      // On envoie les données au backend par l'API
      const sendSignup = fetch('http://localhost:5000/api/user/signup', {
        method: 'POST',
        body: JSON.stringify(signupInfos),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      sendSignup.then(async (res) => {
        try {
          console.log(res);
          setSignupModal(false);
          setLoginModal(true);
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
          placeholder="Prénom"
          onChange={(event) => setFirstname(event.target.value)}
          value={firstname}
        />
        <div id="firstname-error">{firstnameError}</div>
      </div>

      <div className="form-auth__element">
        <input
          type="text"
          id="lastname"
          placeholder="Nom de famille"
          onChange={(event) => setLastname(event.target.value)}
          value={lastname}
        />
        <div id="lastname-error">{lastnameError}</div>
      </div>

      <div className="form-auth__element">
        <input
          type="text"
          id="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <div id="email-error">{emailError}</div>
      </div>

      <div className="form-auth__element">
        <input
          type="password"
          id="password"
          autoComplete="on"
          placeholder="Mot de passe"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <div id="password-error">{passwordError}</div>
      </div>

      <div className="form-auth__element">
        <input
          type="password"
          id="password-reapeat"
          autoComplete="on"
          placeholder="Répétez le mot de passe"
          onChange={(event) => setPasswordReapeat(event.target.value)}
          value={passwordRepeat}
        />
        <div id="password-repeat-error">{passwordRepeatError}</div>
      </div>
      <button type="submit" id="signup" className="form-auth__button">
        Créer un compte
      </button>
    </form>
  );
};

export default Signup;
