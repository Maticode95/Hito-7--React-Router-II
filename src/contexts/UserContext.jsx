import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // token simulado - por defecto false (usuario no logueado)
  const [token, setToken] = useState(false);
  // email del usuario logueado
  const [email, setEmail] = useState("");

  const logout = () => {
    setToken(false);
    setEmail("");
  };

  const login = (userEmail) => {
    setToken(true);
    setEmail(userEmail);
  };

  return (
    <UserContext.Provider value={{ token, email, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};
