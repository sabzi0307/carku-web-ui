// src/components/layout/Layout.tsx
import React from 'react';
import { useAppStore } from '../../store/appStore';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { cn } from '../../utils/cn';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language, sidebarCollapsed } = useAppStore();
  const isRTL = language === 'fa';

  return (
    <div className={cn(
      "min-h-screen bg-background",
      isRTL ? 'rtl' : 'ltr'
    )}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300",
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64",
          isRTL && (sidebarCollapsed ? "lg:mr-20 lg:ml-0" : "lg:mr-64 lg:ml-0")
        )}>
          {/* Header */}
          <Header />
          
          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <div className="animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};