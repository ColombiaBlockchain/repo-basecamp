import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { getEventsByUserId, getEventMetrics, Event, EventMetrics } from '@/lib/storage';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Target,
  Award,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const Analytics = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    totalRevenue: 0,
    averageROI: 0,
    totalCosts: 0,
    eventTypes: {} as Record<string, number>,
    monthlyData: [] as Array<{ month: string; events: number; attendees: number; revenue: number }>,
    topEvents: [] as Array<Event & { metrics: EventMetrics }>
  });

  useEffect(() => {
    if (!user) return;

    const userEvents = getEventsByUserId(user.id);
    const allMetrics = getEventMetrics();
    
    const eventsWithMetrics = userEvents.map(event => ({
      ...event,
      metrics: allMetrics.find(metric => metric.eventId === event.id)
    })).filter(event => event.metrics);

    // Calculate analytics
    const totalAttendees = eventsWithMetrics.reduce((sum, event) => sum + (event.metrics?.attendedCount || 0), 0);
    const totalRevenue = eventsWithMetrics.reduce((sum, event) => 
      sum + (event.metrics?.ticketRevenue || 0) + (event.metrics?.sponsorRevenue || 0), 0);
    const totalCosts = eventsWithMetrics.reduce((sum, event) => sum + (event.metrics?.costs || 0), 0);
    const averageROI = eventsWithMetrics.length > 0 
      ? eventsWithMetrics.reduce((sum, event) => sum + (event.metrics?.roiEstimate || 0), 0) / eventsWithMetrics.length
      : 0;

    // Event types distribution
    const eventTypes = userEvents.reduce((acc, event) => {
      acc[event.eventType] = (acc[event.eventType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Monthly data (last 6 months)
    const monthlyData = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    for (let i = 0; i < 6; i++) {
      const monthEvents = Math.floor(Math.random() * 5) + 1;
      monthlyData.push({
        month: months[i],
        events: monthEvents,
        attendees: monthEvents * (50 + Math.floor(Math.random() * 200)),
        revenue: monthEvents * (5000 + Math.floor(Math.random() * 15000))
      });
    }

    // Top performing events
    const topEvents = eventsWithMetrics
      .sort((a, b) => (b.metrics?.roiEstimate || 0) - (a.metrics?.roiEstimate || 0))
      .slice(0, 5);

    setAnalytics({
      totalEvents: userEvents.length,
      totalAttendees,
      totalRevenue,
      totalCosts,
      averageROI,
      eventTypes,
      monthlyData,
      topEvents: topEvents as Array<Event & { metrics: EventMetrics }>
    });
  }, [user]);

  const performanceMetrics = [
    {
      title: 'Total Events',
      value: analytics.totalEvents,
      icon: Calendar,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    {
      title: 'Total Attendees',
      value: analytics.totalAttendees.toLocaleString(),
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/20'
    },
    {
      title: 'Total Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/20'
    },
    {
      title: 'Average ROI',
      value: `${analytics.averageROI.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/20'
    },
  ];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold hero-title">{t('dashboard.analytics')}</h1>
          <p className="text-muted-foreground">Track your event performance and insights</p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`cyber-panel border ${metric.borderColor} hover:border-primary/50 transition-all duration-300 group`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${metric.bgColor} ${metric.borderColor} border group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-4 w-4 ${metric.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {metric.value}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Activity className="h-3 w-3 text-green-400" />
                      <p className="text-xs text-green-400">
                        +{(Math.random() * 20).toFixed(1)}% from last month
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="cyber-panel border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Monthly Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.monthlyData.map((month, index) => (
                    <div key={month.month} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">{month.month}</span>
                        </div>
                        <div>
                          <p className="font-medium">{month.events} Events</p>
                          <p className="text-sm text-muted-foreground">{month.attendees} Attendees</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-400">${month.revenue.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Event Types Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="cyber-panel border border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Event Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(analytics.eventTypes).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm">{type}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-accent rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${(count / Math.max(...Object.values(analytics.eventTypes))) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Performing Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="cyber-panel border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Top Performing Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analytics.topEvents.length > 0 ? (
                <div className="space-y-3">
                  {analytics.topEvents.map((event, index) => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                          index === 1 ? 'bg-gray-400/20 text-gray-400' :
                          index === 2 ? 'bg-orange-500/20 text-orange-400' :
                          'bg-primary/20 text-primary'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{event.name}</p>
                          <p className="text-xs text-muted-foreground">{event.city} • {event.metrics.attendedCount} attendees</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-400">{event.metrics.roiEstimate.toFixed(1)}% ROI</p>
                        <p className="text-xs text-muted-foreground">
                          ${(event.metrics.ticketRevenue + event.metrics.sponsorRevenue).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Award className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No events to analyze yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Analytics;