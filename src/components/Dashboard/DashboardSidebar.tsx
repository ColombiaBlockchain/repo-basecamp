import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plus, 
  Calendar,
  Settings,
  BarChart3,
  User,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

const DashboardSidebar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      title: t('dashboard.overview'),
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: t('dashboard.createEvent'),
      href: '/dashboard/create-event',
      icon: Plus,
    },
    {
      title: t('dashboard.myEvents'),
      href: '/dashboard/events',
      icon: Calendar,
    },
    {
      title: t('dashboard.analytics'),
      href: '/dashboard/analytics',
      icon: BarChart3,
    },
    {
      title: t('dashboard.profile'),
      href: '/dashboard/profile',
      icon: User,
    },
    {
      title: t('dashboard.settings'),
      href: '/dashboard/settings',
      icon: Settings,
    },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsCollapsed(true)} 
        />
      )}
      
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full bg-card border-r border-border transition-all duration-300 cyber-panel",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className={cn(
            "flex items-center gap-3 transition-opacity duration-300",
            isCollapsed && "opacity-0"
          )}>
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center neon-glow">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold hero-title">EventMetrix</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-accent"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);
            
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  isActive 
                    ? "bg-primary/20 text-primary border border-primary/30 neon-glow" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                  isActive ? "text-primary" : "group-hover:scale-110"
                )} />
                <span className={cn(
                  "font-medium transition-opacity duration-300",
                  isCollapsed && "opacity-0 pointer-events-none"
                )}>
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className={cn(
            "p-3 bg-accent/50 rounded-lg border border-border transition-opacity duration-300",
            isCollapsed && "opacity-0"
          )}>
            <p className="text-xs text-muted-foreground text-center">
              EventMetrix v1.0
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              Analytics Platform
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;