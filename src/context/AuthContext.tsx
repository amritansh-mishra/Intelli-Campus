import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { authService, LoginPayload, RegisterPayload } from '../services/authService';
import { AuthUser, ROLE_DASHBOARD, UserRole } from '../types';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<string>;
  register: (payload: RegisterPayload) => Promise<string>;
  logout: () => void;
  hasRole: (...roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'ic_token';
const USER_KEY = 'ic_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(!!localStorage.getItem(TOKEN_KEY));

  const persist = useCallback((nextToken: string, nextUser: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    authService
      .me()
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      })
      .catch(() => logout())
      .finally(() => setIsLoading(false));
  }, [token, logout]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const { data } = await authService.login(payload);
      persist(data.token, data.user);
      return ROLE_DASHBOARD[data.user.role];
    },
    [persist]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const { data } = await authService.register(payload);
      persist(data.token, data.user);
      return ROLE_DASHBOARD[data.user.role];
    },
    [persist]
  );

  const hasRole = useCallback(
    (...roles: UserRole[]) => (user ? roles.includes(user.role) : false),
    [user]
  );

  const value = useMemo(
    () => ({ user, token, isLoading, login, register, logout, hasRole }),
    [user, token, isLoading, login, register, logout, hasRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
