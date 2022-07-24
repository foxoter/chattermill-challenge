export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  expire: string;
  token: string;
}
