import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Target, CheckCircle } from "lucide-react";

const ProblemSolution = () => {
  const problems = [
    "Falta de métricas en tiempo real para eventos blockchain",
    "Datos dispersos y difíciles de analizar", 
    "Sin tracking de ROI efectivo en eventos crypto",
    "Gestión manual propensa a errores"
  ];

  const solutions = [
    "Dashboard unificado con métricas en tiempo real",
    "Integración directa con blockchain para datos verificables",
    "Cálculo automático de ROI y engagement",
    "Automatización completa del proceso de gestión"
  ];

  return (
    <section className="py-20 px-4 bg-gradient-dark">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">El Problema &</span>
            <br />
            <span className="hero-title">Nuestra Solución</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transformamos la gestión de eventos blockchain con análisis inteligente y métricas precisas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Problem Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="cyber-panel h-full">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-4 w-16 h-16 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Problemas Actuales
                </CardTitle>
                <p className="text-muted-foreground">
                  Current Challenges
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {problems.map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20"
                  >
                    <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      {problem}
                    </p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Solution Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="cyber-panel h-full border-primary/30">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-4 w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center shadow-neon">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold hero-title">
                  Nuestra Solución
                </CardTitle>
                <p className="text-muted-foreground">
                  Our Solution
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-foreground/90 text-sm leading-relaxed">
                      {solution}
                    </p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
              <div className="text-4xl font-bold hero-title mb-2">75%</div>
              <p className="text-muted-foreground">Reducción en tiempo de análisis</p>
              <p className="text-sm text-muted-foreground/70 italic">Analysis time reduction</p>
            </div>
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
              <div className="text-4xl font-bold hero-title mb-2">189%</div>
              <p className="text-muted-foreground">Incremento promedio en ROI</p>
              <p className="text-sm text-muted-foreground/70 italic">Average ROI increase</p>
            </div>
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
              <div className="text-4xl font-bold hero-title mb-2">24/7</div>
              <p className="text-muted-foreground">Monitoreo en tiempo real</p>
              <p className="text-sm text-muted-foreground/70 italic">Real-time monitoring</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolution;