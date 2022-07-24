import React, { useContext, createContext, useState } from "react";
import { LoginCredentials, LoginResponse } from "../typings/login";
import { login } from "../api/feedback-api";
import { AxiosResponse } from "axios";
import { setCookie, deleteCookie, getCookie } from "../utils/cookie";

interface AuthContextType {
  user: boolean | null;
  signIn: (credentials: LoginCredentials) => void;
  signOut: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const ProvideAuth: React.FC<React.ReactNode> = ({ children }: any) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState<boolean | null>(null);

  const checkAuth = () => {
    if (getCookie("token")) {
      setUser(true);
    } else {
      setUser(false);
    }
  };

  const signIn = (credentials: LoginCredentials) => {
    login(credentials)
      .then((data: AxiosResponse<LoginResponse>) => {
        console.log(data);
        const token = `Bearer ${data.data.token}`;
        setCookie("token", token);
        setUser(true);
      })
      .catch((err) => {
        console.log(err);
        setUser(false);
      });
  };

  const signOut = () => {
    setUser(false);
    deleteCookie("token");
  };

  return {
    user,
    signIn,
    signOut,
    checkAuth,
  };
};
