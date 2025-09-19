import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { AuthModals } from "@/components/AuthModals";
import { useLanguage } from "@/hooks/useLanguage";

const AuthButtons = () => {
  const { t } = useLanguage();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleSwitchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const handleSwitchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  return (
    <section className="py-20 px-4 bg-gradient-dark">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">{t('hero.title').includes('Revolution') ? 'Ready to' : '¿Listo para'}</span>
            <br />
            <span className="hero-title">{t('hero.title').includes('Revolution') ? 'Get Started?' : 'Empezar?'}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button 
                variant="hero" 
                size="xl"
                className="group min-w-[200px]"
                onClick={() => setIsRegisterOpen(true)}
              >
                <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {t('cta.signup')}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button 
                variant="cyber" 
                size="xl"
                className="group min-w-[200px]"
                onClick={() => setIsLoginOpen(true)}
              >
                <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                {t('cta.login')}
              </Button>
            </motion.div>
          </div>

          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-primary mb-2">✓</div>
              <p className="text-sm text-foreground font-medium">Dashboard completo</p>
              <p className="text-xs text-muted-foreground">Full dashboard access</p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-primary mb-2">✓</div>
              <p className="text-sm text-foreground font-medium">Métricas en tiempo real</p>
              <p className="text-xs text-muted-foreground">Real-time metrics</p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-primary mb-2">✓</div>
              <p className="text-sm text-foreground font-medium">Soporte 24/7</p>
              <p className="text-xs text-muted-foreground">24/7 support</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-8 text-sm text-muted-foreground"
          >
            <p>Sin costo inicial • No credit card required • Cancela cuando quieras</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Auth Modals */}
      <AuthModals
        isRegisterOpen={isRegisterOpen}
        isLoginOpen={isLoginOpen}
        onRegisterClose={() => setIsRegisterOpen(false)}
        onLoginClose={() => setIsLoginOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
        onSwitchToRegister={handleSwitchToRegister}
      />
    </section>
  );
};

export default AuthButtons;