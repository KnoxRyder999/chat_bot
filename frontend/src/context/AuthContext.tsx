import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextProps {}

type User = {
  name: string;
  email: string;
  password: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // fetch if the user cookies are valid then skip login
  }, []);
  const login = async (email: string, password: string) => {};
  const signup = async (name: string, email: string, password: string) => {};
  const logout = () => {};

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
