import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Calendar, Users, TrendingUp } from "lucide-react";

const MockupsShowcase = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="hero-title">Dashboard</span>
            <br />
            <span className="text-muted-foreground text-2xl md:text-3xl">Preview</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interfaz intuitiva diseñada para maximizar la eficiencia en el análisis de eventos
          </p>
        </motion.div>

        {/* Main Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto mb-16"
        >
          <Card className="cyber-panel overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
              <div className="bg-gradient-dark p-6 border-b border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold hero-title">Event Metrics Dashboard</h3>
                    <p className="text-muted-foreground">Real-time blockchain events analytics</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <div className="w-3 h-3 rounded-full bg-primary/50" />
                    <div className="w-3 h-3 rounded-full bg-primary/30" />
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 space-y-6">
                {/* KPI Cards Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Calendar, title: "Total Events", value: "12", trend: "+23%" },
                    { icon: Users, title: "Attendees", value: "2,847", trend: "+18%" },
                    { icon: TrendingUp, title: "Avg ROI", value: "189%", trend: "+12%" },
                    { icon: BarChart3, title: "Engagement", value: "92%", trend: "+5%" }
                  ].map((kpi, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-4 rounded-lg bg-secondary/50 border border-border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <kpi.icon className="w-5 h-5 text-primary" />
                        <span className="text-xs text-primary font-medium">{kpi.trend}</span>
                      </div>
                      <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                      <div className="text-xs text-muted-foreground">{kpi.title}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Chart Area Mockup */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Line Chart Mockup */}
                  <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                    <h4 className="text-lg font-semibold mb-4 text-foreground">Monthly Growth</h4>
                    <div className="h-48 relative">
                      <div className="w-full h-full bg-gradient-to-t from-primary/20 to-transparent rounded-lg flex items-end justify-center">
                        <div className="flex items-end gap-2 w-full px-4 pb-4">
                          {[40, 65, 45, 80, 70, 90].map((height, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              whileInView={{ height: `${height}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              viewport={{ once: true }}
                              className="bg-primary rounded-sm flex-1 min-h-[10px]"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Events List Mockup */}
                  <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                    <h4 className="text-lg font-semibold mb-4 text-foreground">Recent Events</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Blockchain Summit 2024", status: "completed", attendees: "547" },
                        { name: "DeFi Workshop Series", status: "completed", attendees: "89" },
                        { name: "NFT Creator Bootcamp", status: "active", attendees: "76" }
                      ].map((event, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex justify-between items-center p-3 rounded-lg bg-background/50"
                        >
                          <div>
                            <div className="font-medium text-foreground text-sm">{event.name}</div>
                            <div className="text-xs text-muted-foreground">{event.attendees} attendees</div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.status === 'active' 
                              ? 'bg-primary/20 text-primary' 
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {event.status}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Real-time Updates",
              description: "Datos actualizados en tiempo real con WebSocket integration"
            },
            {
              title: "Interactive Charts", 
              description: "Gráficos interactivos con drill-down capabilities"
            },
            {
              title: "Multi-device Ready",
              description: "Diseño responsivo optimizado para móvil y desktop"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center shadow-neon">
                <div className="w-6 h-6 rounded-full bg-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MockupsShowcase;