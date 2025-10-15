
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    username: string | null;
    initialized: boolean;
    setUsername: (name: string | null) => void;
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            username: null,
            initialized: false,

            setUsername: (name) => set({ username: name }),

            fetchUser: async () => {
                if (get().initialized) return; // only once
                try {
                    const res = await fetch("/api/account", { credentials: "include" });
                    if (!res.ok) throw new Error("Unauthorized");
                    const data = await res.json();
                    if (data.authenticated) {
                        set({ username: data.username, initialized: true });
                    } else {
                        set({ username: null, initialized: true });
                    }
                } catch {
                    set({ username: null, initialized: true });
                }
            },

            logout: async () => {
                await fetch("/api/logout", { method: "POST", credentials: "include" });
                set({ username: null, initialized: true });
            },
        }),
        {
            name: "user-storage",
            partialize: (state) => ({ username: state.username }),
        }
    )
);

