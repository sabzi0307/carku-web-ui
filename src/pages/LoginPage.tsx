// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAppStore } from '../store/appStore';
import { useTranslations } from '../utils/translations';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Eye, EyeOff, Moon, Sun, Languages } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuthStore();
  const { language, theme, setLanguage, setTheme } = useAppStore();
  const { t } = useTranslations(language);
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData);
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isRTL = language === 'fa';

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 ${isRTL ? 'rtl font-persian' : 'ltr font-english'}`}>
      {/* Theme and Language Toggle */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
        >
          <Languages className="h-4 w-4" />
        </Button>
      </div>

      <Card className="w-full max-w-md glass-effect animate-fade-in">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{t('auth.welcomeBack')}</CardTitle>
          <p className="text-muted-foreground">{t('auth.loginToAccount')}</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t('auth.username')}</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="transition-all duration-200 focus:scale-[1.02]"
                placeholder={t('auth.username')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="pr-10 transition-all duration-200 focus:scale-[1.02]"
                  placeholder={t('auth.password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="rounded border-gray-300 focus:ring-primary"
              />
              <Label htmlFor="rememberMe" className="text-sm">
                {t('auth.rememberMe')}
              </Label>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full transition-all duration-200 hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? t('common.loading') : t('auth.login')}
            </Button>

            <div className="text-center">
              <a
                href="#"
                className="text-sm text-primary hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                {t('auth.forgotPassword')}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};