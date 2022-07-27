import { AllThemesResponse } from "../typings/feed";
import { API_BASE } from "../constants/api";

export interface ReviewsRequestOptions {
  offset: number | string;
}

export const getUrl = (path: string, options?: ReviewsRequestOptions) => {
  const searchParams = new URLSearchParams();
  for (const property in options) {
    const value = String(options[property as keyof ReviewsRequestOptions]);
    searchParams.append(property, value);
  }

  return `${API_BASE}${path}?${searchParams.toString()}`;
};

export const getOffsetsArray = (batches: number, step: number): number[] => {
  let offsets = [];
  for (let i = 0; i < batches; i++) {
    offsets.push(i === 0 ? 0 : i * step);
  }
  return offsets.length ? offsets : [0];
};

export const mapAllThemesToOptions = (res: AllThemesResponse) => {
  const data = res.map((response) => response.data.data);
  return data.flat().map((item) => ({ value: item.id, label: item.name }));
};
