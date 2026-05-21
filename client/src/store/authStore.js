import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../services/api";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, accessToken: null, loading: false, error: null,
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.post("/auth/login", { email, password });
          set({ user: data.user, accessToken: data.accessToken, loading: false });
        } catch (err) { set({ error: err.response?.data?.message || "Login failed", loading: false }); }
      },
      register: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.post("/auth/register", { name, email, password });
          set({ user: data.user, accessToken: data.accessToken, loading: false });
        } catch (err) { set({ error: err.response?.data?.message || "Register failed", loading: false }); }
      },
      logout: async () => { await api.post("/auth/logout").catch(() => {}); set({ user: null, accessToken: null }); },
      setTokens: (accessToken) => set({ accessToken }),
    }),
    { name: "auth", partialize: (s) => ({ user: s.user, accessToken: s.accessToken }) }
  )
);
