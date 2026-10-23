// src/pages/InvoicesPage.tsx
import React from 'react';
import { useAppStore } from '../store/appStore';
import { useTranslations } from '../utils/translations';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FileText, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../utils/cn';

export const InvoicesPage: React.FC = () => {
  const { language } = useAppStore();
  const { t } = useTranslations(language);
  const isRTL = language === 'fa';

  return (
    <div className={cn(
      "p-6 space-y-6",
      isRTL ? 'font-persian rtl' : 'font-english ltr'
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t('nav.invoices')}</h1>
            <p className="text-muted-foreground mt-1">
              Manage invoices and billing
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Invoice management functionality will be implemented in future updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

