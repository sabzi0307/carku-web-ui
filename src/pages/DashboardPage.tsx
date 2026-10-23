// src/pages/DashboardPage.tsx
import React, { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { useTranslations } from '../utils/translations';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Users, 
  FileText, 
  CreditCard, 
  Settings,
  TrendingUp,
  TrendingDown,
  Activity,
  Plus,
  Eye
} from 'lucide-react';
import { cn } from '../utils/cn';

interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 relative overflow-hidden group",
        isHovered && "ring-2 ring-primary/20"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn(
          "p-2 rounded-full transition-colors duration-200",
          isHovered ? "bg-primary text-primary-foreground" : "bg-muted"
        )}>
          {icon}
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="flex items-center text-xs">
          {changeType === 'increase' ? (
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
          )}
          <span className={changeType === 'increase' ? 'text-green-500' : 'text-red-500'}>
            {change}
          </span>
          <span className="text-muted-foreground ml-1">from last month</span>
        </div>
        
        {/* Action buttons that appear on hover */}
        <div className={cn(
          "flex gap-2 mt-3 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}>
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const DashboardPage: React.FC = () => {
  const { language } = useAppStore();
  const { t } = useTranslations(language);
  
  const isRTL = language === 'fa';

  const dashboardCards = [
    {
      title: t('dashboard.totalCustomers'),
      value: '1,234',
      change: '+12%',
      changeType: 'increase' as const,
      icon: <Users className="h-4 w-4" />,
      onClick: () => console.log('Navigate to customers'),
    },
    {
      title: t('dashboard.totalInvoices'),
      value: '2,456',
      change: '+8%',
      changeType: 'increase' as const,
      icon: <FileText className="h-4 w-4" />,
      onClick: () => console.log('Navigate to invoices'),
    },
    {
      title: t('dashboard.totalChecks'),
      value: '892',
      change: '-3%',
      changeType: 'decrease' as const,
      icon: <CreditCard className="h-4 w-4" />,
      onClick: () => console.log('Navigate to checks'),
    },
    {
      title: 'Active Sessions',
      value: '45',
      change: '+15%',
      changeType: 'increase' as const,
      icon: <Activity className="h-4 w-4" />,
      onClick: () => console.log('Navigate to sessions'),
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'customer',
      message: 'New customer "Ahmad Rezaei" was added',
      time: '2 minutes ago',
      icon: <Users className="h-4 w-4 text-green-500" />,
    },
    {
      id: 2,
      type: 'invoice',
      message: 'Invoice #INV-001 was created',
      time: '15 minutes ago',
      icon: <FileText className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 3,
      type: 'check',
      message: 'Check payment received',
      time: '1 hour ago',
      icon: <CreditCard className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 4,
      type: 'settings',
      message: 'System settings updated',
      time: '2 hours ago',
      icon: <Settings className="h-4 w-4 text-orange-500" />,
    },
  ];

  return (
    <div className={cn(
      "p-6 space-y-6",
      isRTL ? 'font-persian' : 'font-english'
    )}>
      {/* Welcome Section */}
      <div className={cn(
        "flex flex-col md:flex-row items-center justify-between gap-4 bg-muted rounded-xl p-6 shadow-sm",
        isRTL ? "md:flex-row-reverse" : ""
      )}>
        <div>
          <h2 className="text-xl font-bold mb-1">
            {t('dashboard.welcome')}
          </h2>
          <p className="text-muted-foreground text-sm">
            {t('dashboard.subtitle')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="default">{t('customers.addCustomer')}</Button>
          <Button variant="outline">{t('settings.title')}</Button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
        isRTL ? "lg:grid-cols-4" : ""
      )}>
        {dashboardCards.map((card, idx) => (
          <DashboardCard key={idx} {...card} />
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-muted rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          {t('dashboard.recentActivity')}
        </h3>
        <ul className="divide-y divide-muted-foreground/10">
          {recentActivities.map(activity => (
            <li key={activity.id} className="py-3 flex items-center gap-3">
              <span>{activity.icon}</span>
              <span className="flex-1">
                <span className="font-medium">{activity.message}</span>
                <span className="ml-2 text-xs text-muted-foreground">{activity.time}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};