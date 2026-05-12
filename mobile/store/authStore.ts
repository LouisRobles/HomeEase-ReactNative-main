import { create } from 'zustand';

type Role = 'client' | 'worker';

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
} | null;

type AuthState = {
  user: User;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false
    })
}));

