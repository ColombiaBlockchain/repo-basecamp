import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import DashboardKPIs from '@/components/Dashboard/DashboardKPIs';
import { EventModal } from '@/components/EventModal';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { getEventsByUserId, getEventMetrics, Event, EventMetrics } from '@/lib/storage';
import { Plus, User, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardOverview = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [recentEvents, setRecentEvents] = useState<(Event & { metrics?: EventMetrics })[]>([]);

  useEffect(() => {
    if (!user) return;

    const userEvents = getEventsByUserId(user.id);
    const allMetrics = getEventMetrics();
    
    const eventsWithMetrics = userEvents.slice(0, 3).map(event => ({
      ...event,
      metrics: allMetrics.find(metric => metric.eventId === event.id)
    }));

    setRecentEvents(eventsWithMetrics);
  }, [user]);

  const handleEventCreated = () => {
    setIsEventModalOpen(false);
    // Refresh data
    if (user) {
      const userEvents = getEventsByUserId(user.id);
      const allMetrics = getEventMetrics();
      
      const eventsWithMetrics = userEvents.slice(0, 3).map(event => ({
        ...event,
        metrics: allMetrics.find(metric => metric.eventId === event.id)
      }));

      setRecentEvents(eventsWithMetrics);
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* KPI Cards */}
        <DashboardKPIs />

        {/* Quick Actions & Recent Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="cyber-panel border border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
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
                <Button
                  variant="dashboard"
                  className="w-full justify-start gap-3"
                >
                  <TrendingUp className="w-4 h-4" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="cyber-panel border border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Recent Events</CardTitle>
              </CardHeader>
              <CardContent>
                {recentEvents.length > 0 ? (
                  <div className="space-y-3">
                    {recentEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-primary" />
                          <div>
                            <p className="font-medium text-sm">{event.name}</p>
                            <p className="text-xs text-muted-foreground">{event.city}</p>
                          </div>
                        </div>
                        {event.metrics && (
                          <div className="text-xs text-green-400">
                            ROI: {event.metrics.roiEstimate.toFixed(1)}%
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No events yet</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => setIsEventModalOpen(true)}
                    >
                      Create your first event
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="cyber-panel border border-border text-center">
            <CardContent className="p-6">
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
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Event Creation Modal */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onEventCreated={handleEventCreated}
      />
    </div>
  );
};

export default DashboardOverview;