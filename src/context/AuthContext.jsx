import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, try to restore session by fetching profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/auth/profile');
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        // Not authenticated, that's fine
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const register = async (name, email, password) => {
    const { data } = await API.post('/auth/register', { name, email, password });
    if (data.success) {
      setUser(data.user);
    }
    return data;
  };

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    if (data.success) {
      setUser(data.user);
    }
    return data;
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (error) {
      // Logout anyway on client side
    }
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
