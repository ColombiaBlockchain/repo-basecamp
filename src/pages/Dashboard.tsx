import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import DashboardKPIs from '@/components/Dashboard/DashboardKPIs';
import { EventModal } from '@/components/EventModal';
import LanguageSwitch from '@/components/LanguageSwitch';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Plus, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const { t } = useLanguage();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

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
                  {t('dashboard.welcome')}, {user.displayName}!
                </h1>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()} • {t('dashboard.overview')}
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
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* KPI Cards */}
            <DashboardKPIs />

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="cyber-panel rounded-lg p-6 border border-border"
              >
                <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="dashboard"
                    className="w-full justify-start gap-3"
                    onClick={() => setIsEventModalOpen(true)}
                  >
                    <Plus className="w-4 h-4" />
                    {t('dashboard.createEvent')}
                  </Button>
                  <Button
                    variant="dashboard"
                    className="w-full justify-start gap-3"
                  >
                    <User className="w-4 h-4" />
                    {t('dashboard.profile')}
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="cyber-panel rounded-lg p-6 border border-border"
              >
                <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Account created</span>
                    <span className="text-primary">Today</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Dashboard accessed</span>
                    <span className="text-primary">Now</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="cyber-panel rounded-lg p-6 border border-border text-center"
            >
              <h2 className="text-2xl font-bold mb-4 hero-title">
                Welcome to EventMetrix
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Start by creating your first event to track analytics, manage attendees, 
                and optimize your event ROI with our advanced metrics platform.
              </p>
              <Button
                variant="hero"
                size="lg"
                onClick={() => setIsEventModalOpen(true)}
                className="gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Your First Event
              </Button>
            </motion.div>
          </motion.div>
        </div>
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