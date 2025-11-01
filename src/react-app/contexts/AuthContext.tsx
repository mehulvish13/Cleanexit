import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
  loginTime: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
  isPending: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('cleanexit_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('cleanexit_user');
      }
    }
    setIsPending(false);
  }, []);

  const login = (username: string) => {
    const newUser: User = {
      username,
      loginTime: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('cleanexit_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cleanexit_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isPending }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
