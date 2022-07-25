import axios from "axios";
import { getCookie } from "../utils/cookie";
import { API_BASE, feedBackEndpoints } from "../constants/api";
import { LoginCredentials } from "../typings/login";

const feedbackApi = axios.create({
  baseURL: API_BASE,
});

export const login = async (credentials: LoginCredentials) => {
  return await feedbackApi.post(feedBackEndpoints.login, credentials);
};

export const getThemes = async () => {
  return await feedbackApi.get(feedBackEndpoints.themes, {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });
};
