import axios from "axios";

const API = axios.create({
  baseURL: "http://10.0.2.2:5004/api",
});

export default API;
