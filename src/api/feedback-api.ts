import axios from "axios";
import { getCookie } from "../utils/cookie";
import { getOffsetsArray, getUrl, ReviewsRequestOptions } from "../utils/api";
import {
  API_BASE,
  feedBackEndpoints,
  OFFSET_STEP,
  THEMES_MAX_BATCHES,
} from "../constants/api";
import { LoginCredentials } from "../typings/login";

const feedbackApi = axios.create({
  baseURL: API_BASE,
});

export const login = async (credentials: LoginCredentials) => {
  return await feedbackApi.post(feedBackEndpoints.login, credentials);
};

export const getThemes = async (options?: ReviewsRequestOptions) => {
  let url = getUrl(feedBackEndpoints.themes, options);
  return await feedbackApi.get(url, {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });
};

export const getAllThemes = async () => {
  const offsets = getOffsetsArray(THEMES_MAX_BATCHES, OFFSET_STEP);
  const promises = offsets.map((offset) => getThemes({ offset: offset }));
  return await Promise.all(promises);
};

export const getReviews = async (options?: ReviewsRequestOptions) => {
  let url = getUrl(feedBackEndpoints.reviews, options);
  return await feedbackApi.get(url, {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });
};
