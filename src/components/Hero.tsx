import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, LogIn, UserPlus, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { AuthModals } from "@/components/AuthModals";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useLanguage } from "@/hooks/useLanguage";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-gradient-dark">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,30,86,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,30,86,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
          >
            <span className="hero-title">Event</span>
            <br />
            <span className="text-foreground">Metrics</span>
          </motion.h1>

          {/* Subtitle bilingual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 space-y-2"
          >
            <p className="text-xl md:text-2xl text-muted-foreground">
              Plataforma moderna para gestión y análisis de eventos blockchain
            </p>
            <p className="text-lg md:text-xl text-muted-foreground/80">
              Modern platform for blockchain events management & real-time analytics
            </p>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Real-time Analytics</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Zap className="w-5 h-5 text-primary" />
              <span>Instant Metrics</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Shield className="w-5 h-5 text-primary" />
              <span>Blockchain Security</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              variant="hero" 
              size="xl"
              className="group animate-glow-pulse"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              Registrarse / Sign Up
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="cyber" 
              size="xl"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              Iniciar Sesión / Login
            </Button>
          </motion.div>

          {/* Stats preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">2.8K+</div>
              <div className="text-sm text-muted-foreground">Attendees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">189%</div>
              <div className="text-sm text-muted-foreground">Avg ROI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">92%</div>
              <div className="text-sm text-muted-foreground">Engagement</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl"
      />
    </section>
  );
};

export default Hero;