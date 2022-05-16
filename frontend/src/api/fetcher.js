// récupération infos de connexion du local storage

function headersCreate() {
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));
  if (userConnectionInfos) {
    const token = userConnectionInfos.token;
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  } else {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }
}

let server = 'http://localhost:5000/api';

async function fetcher(url, body, method = 'GET') {
  try {
    const headers = headersCreate();
    const res = await fetch(server + url, { body, method, headers });
    console.log('RES FETCHER');
    console.log(res);
    return await res.json();
  } catch (err) {
    console.error('error:', err);
    throw err;
  }
}

export { fetcher };
