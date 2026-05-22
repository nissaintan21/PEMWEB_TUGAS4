import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserType {
  username: string;
  nama: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserType | null; 
  login: (userData: UserType) => void; 
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: (userData) =>
        set({
          isAuthenticated: true,
          user: userData, // Menyimpan objek utuh ke dalam state user
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);