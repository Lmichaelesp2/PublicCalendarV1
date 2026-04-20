'use client';
import { createContext, useContext, useState } from 'react';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'admin2024';

type AdminContextType = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  getAdminPassword: () => string | null;
};

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(password: string): boolean {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }

  function logout() {
    setIsAuthenticated(false);
  }

  function getAdminPassword(): string | null {
    return isAuthenticated ? ADMIN_PASSWORD : null;
  }

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, getAdminPassword }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
