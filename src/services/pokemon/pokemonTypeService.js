import { BACK_URL, http } from "../httpService";

export const getAllTypesPokemons = () => {
  return new Promise((resolve, reject) => {
    http
      .get(`${BACK_URL}/type`)
      .then((res) => {
        resolve(res.data.results);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};
