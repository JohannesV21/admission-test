import axios from "axios";

export const BACK_URL = "https://pokeapi.co/api/v2";

export const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
