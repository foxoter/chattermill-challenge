import { useState } from "react";

export const useInputType = () => {
  const [passInputType, setPassInputType] = useState("password");

  const changePassInputType = () => {
    setPassInputType(passInputType === "password" ? "text" : "password");
  };

  return { passInputType, changePassInputType };
};
