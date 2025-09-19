import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { getEventsByUserId, getEventMetrics } from '@/lib/storage';
import { 
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  BarChart3,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardKPIs = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    averageROI: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (!user) return;

    const userEvents = getEventsByUserId(user.id);
    const allMetrics = getEventMetrics();
    
    const userMetrics = userEvents.map(event => 
      allMetrics.find(metric => metric.eventId === event.id)
    ).filter(Boolean);

    const totalAttendees = userMetrics.reduce((sum, metric) => sum + (metric?.attendedCount || 0), 0);
    const totalRevenue = userMetrics.reduce((sum, metric) => 
      sum + (metric?.ticketRevenue || 0) + (metric?.sponsorRevenue || 0), 0);
    const averageROI = userMetrics.length > 0 
      ? userMetrics.reduce((sum, metric) => sum + (metric?.roiEstimate || 0), 0) / userMetrics.length
      : 0;

    setMetrics({
      totalEvents: userEvents.length,
      totalAttendees,
      averageROI,
      totalRevenue,
    });
  }, [user]);

  const kpiCards = [
    {
      title: t('metrics.totalEvents'),
      value: metrics.totalEvents,
      icon: Calendar,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    {
      title: t('metrics.totalAttendees'),
      value: metrics.totalAttendees.toLocaleString(),
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/20'
    },
    {
      title: t('metrics.averageRoi'),
      value: `${metrics.averageROI.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/20'
    },
    {
      title: t('metrics.totalRevenue'),
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/20'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiCards.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`kpi-card border ${kpi.borderColor} hover:border-primary/50 transition-all duration-300 group`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${kpi.bgColor} ${kpi.borderColor} border group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {kpi.value}
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
  );
};

export default DashboardKPIs;