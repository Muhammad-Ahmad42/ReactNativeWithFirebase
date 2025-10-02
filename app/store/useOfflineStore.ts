// store/useOfflineStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PendingData = {
    id: string;
    payload: { name: string; age: string; createdAt: string };
};

type OfflineStore = {
    pending: PendingData[];
    addPending: (item: PendingData) => void;
    removePending: (id: string) => void;
    clearPending: () => void;
};

const useOfflineStore = create<OfflineStore>()(
    persist(
        (set) => ({
            pending: [],
            addPending: (item) =>
                set((state) => ({ pending: [...state.pending, item] })),
            removePending: (id) =>
                set((state) => ({
                    pending: state.pending.filter((item) => item.id !== id),
                })),
            clearPending: () => set({ pending: [] }),
        }),
        {
            name: "offline-storage",
            storage: {
                getItem: async (name) => {
                    const value = await AsyncStorage.getItem(name);
                    return value ? JSON.parse(value) : null;
                },
                setItem: async (name, value) => {
                    await AsyncStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: async (name) => {
                    await AsyncStorage.removeItem(name);
                },
            },
        }
    )
);
export default useOfflineStore;