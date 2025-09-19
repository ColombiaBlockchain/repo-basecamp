import { useEffect, useState } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import { EventModal } from '@/components/EventModal';
import LanguageSwitch from '@/components/LanguageSwitch';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Plus, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

// Dashboard Pages
import DashboardOverview from './Dashboard/DashboardOverview';
import MyEvents from './Dashboard/MyEvents';
import Analytics from './Dashboard/Analytics';
import Profile from './Dashboard/Profile';
import Settings from './Dashboard/Settings';

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return t('dashboard.overview');
    if (path.includes('/events')) return t('dashboard.myEvents');
    if (path.includes('/analytics')) return t('dashboard.analytics');
    if (path.includes('/profile')) return t('dashboard.profile');
    if (path.includes('/settings')) return t('dashboard.settings');
    if (path.includes('/create-event')) return t('dashboard.createEvent');
    return t('dashboard.overview');
  };

  useEffect(() => {
    // Listen for language changes
    const handleLanguageChange = () => {
      // Force re-render
      window.location.reload();
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-64 xl:ml-64">
        {/* Header */}
        <header className="bg-card border-b border-border cyber-panel">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold hero-title">
                  {getPageTitle()}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()} • Welcome, {user.displayName}!
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <LanguageSwitch />
              
              <Button
                variant="hero"
                size="sm"
                onClick={() => setIsEventModalOpen(true)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                {t('dashboard.createEvent')}
              </Button>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-accent/50 rounded-lg border border-border">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <Routes>
          <Route index element={<DashboardOverview />} />
          <Route path="events" element={<MyEvents />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="create-event" element={<DashboardOverview />} />
        </Routes>
      </main>

      {/* Event Creation Modal */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onEventCreated={() => {
          // Refresh the page to show updated metrics
          window.location.reload();
        }}
      />
    </div>
  );
};

export default Dashboard;