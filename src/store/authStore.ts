// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginRequest, LoginResponse } from '../types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true });
        try {
          // Mock API call - replace with actual API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful login
          const mockResponse: LoginResponse = {
            user: {
              id: 1,
              username: credentials.username,
              email: 'user@example.com',
              firstName: 'John',
              lastName: 'Doe',
              role: 'admin',
              createdAt: new Date(),
              lastLogin: new Date(),
            },
            token: 'mock-jwt-token',
            refreshToken: 'mock-refresh-token',
            expiresIn: 3600,
          };
          
          set({ 
            user: mockResponse.user, 
            token: mockResponse.token,
            isAuthenticated: true,
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      
      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },
      
      checkAuth: () => {
        const { token, user } = get();
        const isValid = !!(token && user);
        set({ isAuthenticated: isValid });
        return isValid;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);