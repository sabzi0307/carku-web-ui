// src/store/appStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'fa';
export type Theme = 'light' | 'dark';

interface AppState {
  language: Language;
  theme: Theme;
  sidebarCollapsed: boolean;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en',
      theme: 'light',
      sidebarCollapsed: false,
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    }),
    {
      name: 'app-settings',
    }
  )
);