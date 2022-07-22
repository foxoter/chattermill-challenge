import axios from "axios";
import { API_BASE, feedBackEndpoints } from "../constants/api";
import { LoginCredentials } from "../typings/login";

const feedbackApi = axios.create({
  baseURL: API_BASE,
});

export const login = async (credentials: LoginCredentials) => {
  return await feedbackApi.post(feedBackEndpoints.login, credentials);
};
