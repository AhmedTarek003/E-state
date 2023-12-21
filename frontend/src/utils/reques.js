import axios from "axios";

export const request = axios.create({
  baseURL: "https://e-state-app.onrender.com/api/",
});
