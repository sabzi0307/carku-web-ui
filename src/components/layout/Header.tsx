// src/components/layout/Header.tsx
import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { useTranslations } from '../../utils/translations';
import { Button } from '../ui/button';
import { Menu, Moon, Sun, Languages, Bell, Search, User, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { language, theme, setLanguage, setTheme, toggleSidebar } = useAppStore();
  const { t } = useTranslations(language);
  
  const isRTL = language === 'fa';

  return (
    <header className={`bg-background border-b border-border sticky top-0 z-40 ${isRTL ? 'font-persian' : 'font-english'}`}>
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side - Menu and Search */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Search Bar */}
          <div className="hidden md:flex relative">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4`} />
            <input
              type="text"
              placeholder={t('common.search')}
              className={`bg-muted/50 border-0 rounded-md ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
            />
          </div>
        </div>

        {/* Right side - Actions and User */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="relative"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
            className="relative"
          >
            <Languages className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </Button>

          {/* User Menu */}
          <div className="flex items-center gap-3 ml-4 border-l pl-4">
            <div className={`hidden sm:block ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="text-sm font-medium">{user?.firstName} {user?.lastName}</div>
              <div className="text-xs text-muted-foreground">{user?.email}</div>
            </div>
            
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              title={t('nav.logout')}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};