import axios from "axios";

const productionUrl = "https://strapi-store-server.onrender.com/api";

export const comfySloth = axios.create({
  baseURL: productionUrl,
});
