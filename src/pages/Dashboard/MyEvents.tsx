import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { getEventsByUserId, getEventMetrics, Event, EventMetrics } from '@/lib/storage';
import { Calendar, MapPin, Users, TrendingUp, Plus, Edit, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { EventModal } from '@/components/EventModal';

const MyEvents = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [events, setEvents] = useState<(Event & { metrics?: EventMetrics })[]>([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const userEvents = getEventsByUserId(user.id);
    const allMetrics = getEventMetrics();
    
    const eventsWithMetrics = userEvents.map(event => ({
      ...event,
      metrics: allMetrics.find(metric => metric.eventId === event.id)
    }));

    setEvents(eventsWithMetrics);
  }, [user]);

  const getStatusColor = (startDate?: Date) => {
    if (!startDate) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    
    const now = new Date();
    const eventDate = new Date(startDate);
    
    if (eventDate > now) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (eventDate.toDateString() === now.toDateString()) return 'bg-green-500/20 text-green-400 border-green-500/30';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getStatusText = (startDate?: Date) => {
    if (!startDate) return 'Draft';
    
    const now = new Date();
    const eventDate = new Date(startDate);
    
    if (eventDate > now) return 'Upcoming';
    if (eventDate.toDateString() === now.toDateString()) return 'Live';
    return 'Completed';
  };

  const handleEventCreated = () => {
    setIsEventModalOpen(false);
    if (user) {
      const userEvents = getEventsByUserId(user.id);
      const allMetrics = getEventMetrics();
      
      const eventsWithMetrics = userEvents.map(event => ({
        ...event,
        metrics: allMetrics.find(metric => metric.eventId === event.id)
      }));

      setEvents(eventsWithMetrics);
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold hero-title">{t('dashboard.myEvents')}</h1>
            <p className="text-muted-foreground">Manage and track your events</p>
          </div>
          <Button
            variant="hero"
            onClick={() => setIsEventModalOpen(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            {t('dashboard.createEvent')}
          </Button>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="cyber-panel border border-border hover:border-primary/50 transition-all duration-300 group">
                  <CardHeader className="space-y-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold line-clamp-2">{event.name}</CardTitle>
                      <Badge className={`${getStatusColor(event.startDate)} border`}>
                        {getStatusText(event.startDate)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{event.objectives}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Event Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.city}</span>
                      </div>
                      
                      {event.startDate && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{new Date(event.startDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span>Expected: {event.expectedAttendees || 'TBD'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="text-xs">
                          {event.eventType}
                        </Badge>
                      </div>
                    </div>

                    {/* Metrics */}
                    {event.metrics && (
                      <div className="p-3 bg-accent/30 rounded-lg space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Attendees</span>
                          <span className="font-medium">{event.metrics.attendedCount}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">ROI</span>
                          <span className={`font-medium ${event.metrics.roiEstimate > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {event.metrics.roiEstimate.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Revenue</span>
                          <span className="font-medium">
                            ${(event.metrics.ticketRevenue + event.metrics.sponsorRevenue).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <BarChart3 className="w-3 h-3" />
                        Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-12"
          >
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No events yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first event to start tracking analytics and managing attendees.
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
        )}
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

export default MyEvents;