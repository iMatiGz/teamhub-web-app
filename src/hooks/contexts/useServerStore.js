import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useServerStore = create(
  persist(
    set => ({
      currentServer: {},
      currentChannel: {},
      currentFriend: {},

      setCurrentServer: serverData => set(() => ({ currentServer: serverData })),
      setCurrentChannel: channelData => set(() => ({ currentChannel: channelData })),
      setCurrentFriend: friendData => set(() => ({ currentFriend: friendData })),
      // updateUserData: userData => set(state => ({ user: { ...state.user, ...userData } })),
      // deleteUserData: () => set(() => ({ user: {} })),
    }),
    {
      name: 'server-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
