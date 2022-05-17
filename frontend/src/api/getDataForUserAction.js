import { fetcher } from './fetcher';
import { store } from '../providers/Store';

async function getDataForUser() {
  // récupération infos de connexion du local storage
  const userConnectionInfos = JSON.parse(localStorage.getItem('token'));

  const test = store.get.login;

  let userId;
  // if (userConnectionInfos) {
  //   userId = userConnectionInfos.userId;
  // }

  if (test) {
    userId = await test.userId;
  }

  let res;
  try {
    res = await fetcher(`/user/${userId}`);

    if (res.error) {
      console.log(res.error);
    }
    if (res[0]) {
      console.log('GET DATA FROM USER ACTION');
      store.set({
        user: {
          ...res[0],
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export { getDataForUser };
