// fetch pour enregistrer un utilisateur
async function signup(signupInfos) {
  try {
    const res = await fetch(`http://localhost:5000/api/user/signup`, {
      method: 'POST',
      body: JSON.stringify(signupInfos),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export default signup;
