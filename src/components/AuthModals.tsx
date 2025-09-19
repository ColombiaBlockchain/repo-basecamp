import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { COUNTRIES, TEAMS, getAllTeams, saveCustomTeam } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

interface AuthModalsProps {
  isRegisterOpen: boolean;
  isLoginOpen: boolean;
  onRegisterClose: () => void;
  onLoginClose: () => void;
  onSwitchToLogin: () => void;
  onSwitchToRegister: () => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  isRegisterOpen,
  isLoginOpen,
  onRegisterClose,
  onLoginClose,
  onSwitchToLogin,
  onSwitchToRegister
}) => {
  const { register, login } = useAuth();
  const { t, currentLanguage } = useLanguage();
  const { toast } = useToast();
  
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    displayName: '',
    country: '',
    team: '',
    role: '',
    customTeam: ''
  });
  
  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!registerForm.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(registerForm.email)) newErrors.email = 'Invalid email format';
    
    if (!registerForm.password) newErrors.password = 'Password is required';
    else if (registerForm.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!registerForm.displayName) newErrors.displayName = 'Display name is required';
    if (!registerForm.country) newErrors.country = 'Country is required';
    if (!registerForm.team) newErrors.team = 'Team is required';
    
    if (registerForm.team === 'other' && !registerForm.customTeam) {
      newErrors.customTeam = 'Custom team name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;
    
    setIsLoading(true);
    
    let teamId = registerForm.team;
    if (registerForm.team === 'other' && registerForm.customTeam) {
      teamId = saveCustomTeam(registerForm.customTeam);
    }
    
    const result = await register({
      ...registerForm,
      team: teamId
    });
    
    setIsLoading(false);
    
    if (result.success) {
      toast({
        title: t('common.success'),
        description: 'Account created successfully',
      });
      onRegisterClose();
      window.location.href = '/dashboard';
    } else {
      toast({
        title: t('common.error'),
        description: result.error || 'Registration failed',
        variant: 'destructive',
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.identifier) return;
    
    setIsLoading(true);
    const result = await login(loginForm.identifier, loginForm.password);
    setIsLoading(false);
    
    if (result.success) {
      toast({
        title: t('common.success'),
        description: 'Welcome back!',
      });
      onLoginClose();
      window.location.href = '/dashboard';
    } else {
      toast({
        title: t('common.error'),
        description: result.error || 'Login failed',
        variant: 'destructive',
      });
    }
  };

  const allTeams = getAllTeams();

  return (
    <>
      {/* Register Modal */}
      <Dialog open={isRegisterOpen} onOpenChange={onRegisterClose}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center hero-title">
              {t('register.title')}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-email">{t('register.email')}</Label>
              <Input
                id="register-email"
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                className={errors.email ? 'border-destructive' : ''}
                required
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-password">{t('register.password')}</Label>
              <div className="relative">
                <Input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                  className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-display-name">{t('register.displayName')}</Label>
              <Input
                id="register-display-name"
                value={registerForm.displayName}
                onChange={(e) => setRegisterForm(prev => ({ ...prev, displayName: e.target.value }))}
                className={errors.displayName ? 'border-destructive' : ''}
                required
              />
              {errors.displayName && <p className="text-sm text-destructive">{errors.displayName}</p>}
            </div>
            
            <div className="space-y-2">
              <Label>{t('register.country')}</Label>
              <Select
                value={registerForm.country}
                onValueChange={(value) => setRegisterForm(prev => ({ ...prev, country: value }))}
              >
                <SelectTrigger className={errors.country ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border max-h-60">
                  {COUNTRIES.map(country => (
                    <SelectItem key={country.code} value={country.code}>
                      {currentLanguage === 'es' ? country.nameEs : country.nameEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
            </div>
            
            <div className="space-y-2">
              <Label>{t('register.team')}</Label>
              <Select
                value={registerForm.team}
                onValueChange={(value) => setRegisterForm(prev => ({ ...prev, team: value }))}
              >
                <SelectTrigger className={errors.team ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border max-h-60">
                  {allTeams.map(team => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.team && <p className="text-sm text-destructive">{errors.team}</p>}
            </div>
            
            {registerForm.team === 'other' && (
              <div className="space-y-2">
                <Label htmlFor="custom-team">Custom Team Name</Label>
                <Input
                  id="custom-team"
                  value={registerForm.customTeam}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, customTeam: e.target.value }))}
                  className={errors.customTeam ? 'border-destructive' : ''}
                  placeholder="Enter team name"
                />
                {errors.customTeam && <p className="text-sm text-destructive">{errors.customTeam}</p>}
              </div>
            )}
            
            <div className="space-y-2">
              <Label>{t('register.role')} (Optional)</Label>
              <Select
                value={registerForm.role}
                onValueChange={(value) => setRegisterForm(prev => ({ ...prev, role: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="ambassador">{t('roles.ambassador')}</SelectItem>
                  <SelectItem value="organizer">{t('roles.organizer')}</SelectItem>
                  <SelectItem value="sponsor">{t('roles.sponsor')}</SelectItem>
                  <SelectItem value="attendee">{t('roles.attendee')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? t('common.loading') : t('register.submit')}
            </Button>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t('register.hasAccount')} </span>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto"
                onClick={onSwitchToLogin}
              >
                {t('register.loginLink')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Login Modal */}
      <Dialog open={isLoginOpen} onOpenChange={onLoginClose}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center hero-title">
              {t('login.title')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex items-center gap-2 p-3 bg-neon-red/10 border border-neon-red/20 rounded-lg mb-4">
            <AlertCircle className="w-4 h-4 text-neon-red" />
            <p className="text-sm text-neon-red">{t('login.prototypeMode')}</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-identifier">{t('login.identifier')}</Label>
              <Input
                id="login-identifier"
                value={loginForm.identifier}
                onChange={(e) => setLoginForm(prev => ({ ...prev, identifier: e.target.value }))}
                placeholder="user@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="login-password">{t('login.password')}</Label>
              <Input
                id="login-password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Optional in prototype mode"
              />
            </div>
            
            <Button
              type="submit"
              variant="cyber"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? t('common.loading') : t('login.submit')}
            </Button>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t('login.noAccount')} </span>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto"
                onClick={onSwitchToRegister}
              >
                {t('login.registerLink')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};