
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    username: string;
    email: string;
    avatar: string;
    base_location: string;
    role: string;
}

interface UserState {
    user: User | null;
    initialized: boolean;
    setUser: (user: User | null) => void;
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            initialized: false,

            setUser: (user) => set({ user }),

            fetchUser: async () => {
                // Only run once per load
                if (get().initialized) return;

                try {
                    const res = await fetch("/api/account", { credentials: "include" });
                    const data = await res.json();

                    if (res.ok && data.authenticated && data.user) {
                        // ✅ Authenticated session confirmed
                        set({ user: data.user, initialized: true });
                    } else {
                        // ⚠️ Keep existing user if session check failed temporarily (network, etc.)
                        const existingUser = get().user;
                        if (existingUser) {
                            set({ initialized: true });
                        } else {
                            set({ user: null, initialized: true });
                        }
                    }
                } catch (err) {
                    console.error("Error fetching user:", err);

                    // ✅ Don't clear persisted user on network failure
                    const existingUser = get().user;
                    if (existingUser) {
                        set({ initialized: true });
                    } else {
                        set({ user: null, initialized: true });
                    }
                }
            },

            logout: async () => {
                try {
                    await fetch("/api/logout", { method: "POST", credentials: "include" });
                } finally {
                    set({ user: null, initialized: true });
                }
            },
        }),
        {
            name: "user-storage",
            partialize: (state) => ({ user: state.user }),
        }
    )
);
