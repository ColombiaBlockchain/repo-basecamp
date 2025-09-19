import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Calendar, Users, TrendingUp, Zap, Shield, Globe, Database } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Analytics en Tiempo Real",
      titleEn: "Real-time Analytics", 
      description: "Métricas instantáneas de tus eventos blockchain con dashboards interactivos",
      descriptionEn: "Instant blockchain event metrics with interactive dashboards"
    },
    {
      icon: Calendar,
      title: "Gestión de Eventos",
      titleEn: "Event Management",
      description: "Crea, organiza y monitorea eventos desde un panel centralizado",
      descriptionEn: "Create, organize and monitor events from a centralized panel"
    },
    {
      icon: Users,
      title: "Tracking de Asistentes", 
      titleEn: "Attendee Tracking",
      description: "Seguimiento detallado de participantes y engagement en tiempo real",
      descriptionEn: "Detailed participant tracking and real-time engagement"
    },
    {
      icon: TrendingUp,
      title: "ROI Intelligence",
      titleEn: "ROI Intelligence",
      description: "Calcula automáticamente el retorno de inversión de cada evento",
      descriptionEn: "Automatically calculate return on investment for each event"
    },
    {
      icon: Zap,
      title: "Integración Blockchain",
      titleEn: "Blockchain Integration", 
      description: "Conecta directamente con redes blockchain para datos verificables",
      descriptionEn: "Direct blockchain network integration for verifiable data"
    },
    {
      icon: Shield,
      title: "Seguridad Avanzada",
      titleEn: "Advanced Security",
      description: "Protección de datos con estándares de seguridad blockchain",
      descriptionEn: "Data protection with blockchain security standards"
    },
    {
      icon: Globe,
      title: "Multi-región",
      titleEn: "Multi-region",
      description: "Gestiona eventos globalmente con equipos distribuidos",
      descriptionEn: "Manage events globally with distributed teams"
    },
    {
      icon: Database,
      title: "Data Intelligence",
      titleEn: "Data Intelligence",
      description: "IA para predicciones y optimización de eventos futuros",
      descriptionEn: "AI for predictions and future event optimization"
    }
  ];

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
            <span className="hero-title">Funcionalidades</span>
            <br />
            <span className="text-muted-foreground text-2xl md:text-3xl">Core Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Herramientas completas para el análisis y gestión de eventos blockchain con métricas en tiempo real
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="kpi-card h-full group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-14 h-14 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-primary/80 font-medium">
                    {feature.titleEn}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                    {feature.description}
                  </p>
                  <p className="text-muted-foreground/70 text-xs italic">
                    {feature.descriptionEn}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;