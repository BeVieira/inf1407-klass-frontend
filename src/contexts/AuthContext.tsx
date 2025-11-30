import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  fetchCurrentUser,
  loginUser,
  refreshAccessToken,
} from "../services/userService";

export type UserRole = "student" | "teacher" | "admin" ;

export interface User {
  id: number;
  username: string;
  email: string;
  registration: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  user: "klass_user",
  access: "klass_access_token",
  refresh: "klass_refresh_token",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.user);
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEYS.access)
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEYS.refresh)
  );

  const persistSession = (
    sessionUser: User,
    tokens: { access: string; refresh: string }
  ) => {
    setUser(sessionUser);
    setAccessToken(tokens.access);
    setRefreshToken(tokens.refresh);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(sessionUser));
    localStorage.setItem(STORAGE_KEYS.access, tokens.access);
    localStorage.setItem(STORAGE_KEYS.refresh, tokens.refresh);
  };

  const login = useCallback(
    async (username: string, password: string) => {
      const tokens = await loginUser({ username, password });
      
      // Pass the new access token to fetch the user profile
      const profile = await fetchCurrentUser(tokens.access); 
      
      if (!profile)
        throw new Error("Não foi possível recuperar o perfil do usuário.");
      
      // Ensure registration is a string (API might return number)
      const normalizedProfile: User = {
        ...profile,
        registration: String(profile.registration),
        role: profile.role as UserRole, // Ensure role matches
      };

      persistSession(normalizedProfile, tokens);
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!refreshToken) return;
      try {
        const { access } = await refreshAccessToken(refreshToken);
        setAccessToken(access);
        localStorage.setItem(STORAGE_KEYS.access, access);
      } catch {
        logout();
      }
    }, 10 * 60 * 1000); // refresh every 10 minutes

    return () => clearInterval(interval);
  }, [refreshToken, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated: !!user && !!accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};



// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
