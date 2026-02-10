import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const API_URL = "http://localhost:5000";

export const UserProvider = ({ children }) => {
  // Cargar token y email desde localStorage al iniciar
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("email") || "";
  });

  // Guardar token y email en localStorage cuando cambien
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (email) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
  }, [email]);

  // Método para hacer login
  const login = async (userEmail, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const data = await response.json();
      
      // Almacenar token y email
      setToken(data.token);
      setEmail(data.email);
      
      return { success: true };
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, error: error.message };
    }
  };

  // Método para hacer register
  const register = async (userEmail, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar usuario");
      }

      const data = await response.json();
      
      // Almacenar token y email
      setToken(data.token);
      setEmail(data.email);
      
      return { success: true };
    } catch (error) {
      console.error("Error en register:", error);
      return { success: false, error: error.message };
    }
  };

  // Método para hacer logout
  const logout = () => {
    setToken(null);
    setEmail("");
  };

  // Método para obtener el perfil del usuario
  const getProfile = async () => {
    try {
      if (!token) {
        throw new Error("No hay token disponible");
      }

      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token inválido, hacer logout
          logout();
          throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente");
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener el perfil");
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error("Error en getProfile:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <UserContext.Provider value={{ token, email, logout, login, register, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};
