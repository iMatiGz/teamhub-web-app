import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    set => ({
      user: {},
      controls: {},

      setUserData: userData => set(() => ({ user: userData })),
      updateUserData: userData => set(state => ({ user: { ...state.user, ...userData } })),
      deleteUserData: () => set(() => ({ user: {} })),

      setControls: () => set(() => ({ controls: { microphone: true, sound: true } })),
      updateControls: updatedControls =>
        set(state => ({ controls: { ...state.controls, ...updatedControls } })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
