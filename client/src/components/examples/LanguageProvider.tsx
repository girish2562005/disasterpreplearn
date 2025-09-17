import { LanguageProvider, LanguageSelector, useLanguage } from '../LanguageProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function LanguageDemo() {
  const { t } = useLanguage();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Language Support Demo</h2>
        <LanguageSelector />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('nav.dashboard')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t('dashboard.welcome')}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('nav.modules')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t('modules.description')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LanguageProviderExample() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <LanguageDemo />
      </div>
    </LanguageProvider>
  );
}