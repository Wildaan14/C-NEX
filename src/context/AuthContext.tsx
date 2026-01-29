import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// User Types
export type UserRole = "admin" | "user" | "company";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  company?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const DEMO_USERS: (User & { password: string })[] = [
  {
    id: "1",
    email: "admin@cnex.id",
    password: "admin123",
    name: "Administrator",
    role: "admin",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "John Doe",
    role: "user",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    email: "company@example.com",
    password: "company123",
    name: "PT Green Energy",
    role: "company",
    company: "PT Green Energy Indonesia",
    createdAt: "2024-02-01",
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("cnex_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("cnex_user");
      }
    }
    setIsLoading(false);
  }, []);

  // Get all users from localStorage + demo users
  const getAllUsers = (): (User & { password: string })[] => {
    const savedUsers = localStorage.getItem("cnex_users");
    const customUsers = savedUsers ? JSON.parse(savedUsers) : [];
    return [...DEMO_USERS, ...customUsers];
  };

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = getAllUsers();
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("cnex_user", JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: "Email atau password salah" };
  };

  // Register function
  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = getAllUsers();
    
    // Check if email already exists
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      setIsLoading(false);
      return { success: false, error: "Email sudah terdaftar" };
    }

    // Create new user
    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
      company: data.company,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const savedUsers = localStorage.getItem("cnex_users");
    const customUsers = savedUsers ? JSON.parse(savedUsers) : [];
    customUsers.push(newUser);
    localStorage.setItem("cnex_users", JSON.stringify(customUsers));

    // Auto login after register
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("cnex_user", JSON.stringify(userWithoutPassword));

    setIsLoading(false);
    return { success: true };
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("cnex_user");
  };

  // Update profile
  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("cnex_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
