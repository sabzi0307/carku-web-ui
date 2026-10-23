// src/pages/SettingsPage.tsx
import React from 'react';
import { useAppStore } from '../store/appStore';
import { useTranslations } from '../utils/translations';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Settings, Palette, Globe, Moon, Sun, Languages } from 'lucide-react';
import { cn } from '../utils/cn';

export const SettingsPage: React.FC = () => {
  const { language, theme, setLanguage, setTheme } = useAppStore();
  const { t } = useTranslations(language);
  const isRTL = language === 'fa';

  return (
    <div className={cn(
      "p-6 space-y-6",
      isRTL ? 'font-persian rtl' : 'font-english ltr'
    )}>
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">{t('settings.title')}</h1>
          <p className="text-muted-foreground mt-1">
            Customize your dashboard preferences
          </p>
        </div>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              {t('settings.appearance')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">{t('settings.theme')}</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => setTheme('light')}
                  className="justify-start gap-2 h-12"
                >
                  <Sun className="h-4 w-4" />
                  {t('settings.light')}
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => setTheme('dark')}
                  className="justify-start gap-2 h-12"
                >
                  <Moon className="h-4 w-4" />
                  {t('settings.dark')}
                </Button>
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">{t('settings.language')}</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  onClick={() => setLanguage('en')}
                  className="justify-start gap-2 h-12"
                >
                  <Globe className="h-4 w-4" />
                  {t('settings.english')}
                </Button>
                <Button
                  variant={language === 'fa' ? 'default' : 'outline'}
                  onClick={() => setLanguage('fa')}
                  className="justify-start gap-2 h-12"
                >
                  <Languages className="h-4 w-4" />
                  {t('settings.persian')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Settings Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              More settings will be available in future updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};