import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signupUser,
} from '../helpers/api-communicator';

type User = {
  name: string;
  email: string;
  password?: string;
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
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({
          email: data.email,
          name: data.name,
          // password: data.password,
        });
        setIsLoggedIn(true);

        // setUser({name: data.name, email: data.email}});
        console.log('🍌 ~ authStatus ~ data:', user);
      }
    }
    checkStatus();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    console.log('🚀 ~ login ~ data:', data);
    if (data) {
      setUser({
        email: data.email,
        name: data.name,
        password: data.password,
      });
      setIsLoggedIn(true);
    }
  };
  const signup = async (name: string, email: string, password: string) => {
    const data = await signupUser(name, email, password);
    console.log('🚀 ~ signup ~ data:', data);
    if (data) {
      setUser({
        email: data.email,
        name: data.name,
        password: data.password,
      });
      setIsLoggedIn(true);
    }
  };
  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload;
  };

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
