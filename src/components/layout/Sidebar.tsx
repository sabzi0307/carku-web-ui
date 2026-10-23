// src/components/layout/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { useTranslations } from '../../utils/translations';
import { Button } from '../ui/button';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';

const navigation = [
  {
    name: 'nav.dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'nav.customers',
    href: '/customers',
    icon: Users,
  },
  {
    name: 'nav.invoices',
    href: '/invoices',
    icon: FileText,
  },
  {
    name: 'nav.checks',
    href: '/checks',
    icon: CreditCard,
  },
  {
    name: 'nav.settings',
    href: '/settings',
    icon: Settings,
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { language, sidebarCollapsed, setSidebarCollapsed } = useAppStore();
  const { t } = useTranslations(language);
  
  const isRTL = language === 'fa';

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm lg:hidden z-40",
          !sidebarCollapsed && "block",
          sidebarCollapsed && "hidden"
        )}
        onClick={() => setSidebarCollapsed(true)}
      />
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 z-50 h-full bg-card border-r border-border transition-all duration-300 shadow-lg lg:static lg:translate-x-0",
          sidebarCollapsed ? "-translate-x-full lg:w-20" : "translate-x-0 w-64",
          isRTL ? "right-0" : "left-0",
          isRTL ? 'font-persian' : 'font-english'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
          
          {/* Collapse button for desktop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={cn(
              "hidden lg:flex",
              sidebarCollapsed && "mx-auto"
            )}
          >
            {sidebarCollapsed ? (
              isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            ) : (
              isRTL ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarCollapsed(true)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground group relative",
                  isActive ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground",
                  sidebarCollapsed && "justify-center px-2"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-transform group-hover:scale-110",
                  isActive && "text-primary-foreground"
                )} />
                
                {!sidebarCollapsed && (
                  <span className="animate-fade-in">{t(item.name)}</span>
                )}
                
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {t(item.name)}
                  </div>
                )}
                
                {isActive && (
                  <div className={cn(
                    "absolute top-0 w-1 h-full bg-primary-foreground rounded-full",
                    isRTL ? "right-0" : "left-0"
                  )} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        {!sidebarCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-1">
                Version 1.0.0
              </div>
              <div className="text-xs text-muted-foreground">
                © 2024 Dashboard
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};