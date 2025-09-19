import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitch = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="w-4 h-4" />
          {currentLanguage.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className={currentLanguage === 'en' ? 'bg-accent' : ''}
        >
          🇺🇸 English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('es')}
          className={currentLanguage === 'es' ? 'bg-accent' : ''}
        >
          🇪🇸 Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitch;