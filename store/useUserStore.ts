import { create } from "zustand";
import { supabase } from "../lib/supabase";

export type UserRole = "client" | "tasker";

export type User = {
  id: string;
  email: string | null;
  role: UserRole;
  name?: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  setName: (name: string) => void;
  fetchUser: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,

  setUser: (user) => set({ user }),

  setName: (name) => {
    const current = get().user;
    if (current) {
      set({
        user: {
          ...current,
          name,
        },
      });
    }
  },

  fetchUser: async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profile) {
          set({
            user: {
              id: user.id,
              email: user.email ?? '',
              role: (profile.role as UserRole) ?? 'client',
            },
          });
        }
      }
    } catch (err) {
      console.error("❌ fetchUser 错误:", err);
    }
  },
}));
