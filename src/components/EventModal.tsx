import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { saveEvent, generateId, Event } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Users, Target } from "lucide-react";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated?: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onEventCreated
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [form, setForm] = useState({
    name: '',
    objectives: '',
    city: '',
    locationUrl: '',
    expectedAttendees: '',
    eventType: '',
    startDate: '',
    endDate: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const eventTypes = [
    { value: 'workshop', label: t('event.types.workshop') },
    { value: 'bootcamp', label: t('event.types.bootcamp') },
    { value: 'networking', label: t('event.types.networking') },
    { value: 'hackathon', label: t('event.types.hackathon') },
    { value: 'expo', label: t('event.types.expo') },
    { value: 'educational', label: t('event.types.educational') },
    { value: 'demo', label: t('event.types.demo') },
    { value: 'ama', label: t('event.types.ama') },
    { value: 'panel', label: t('event.types.panel') },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.name.trim()) newErrors.name = 'Event name is required';
    if (!form.objectives.trim()) newErrors.objectives = 'Objectives are required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.eventType) newErrors.eventType = 'Event type is required';
    
    if (form.expectedAttendees && isNaN(Number(form.expectedAttendees))) {
      newErrors.expectedAttendees = 'Expected attendees must be a number';
    }
    
    if (form.startDate && form.endDate) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);
      if (start > end) {
        newErrors.endDate = 'End date must be after start date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !user) return;
    
    setIsLoading(true);
    
    try {
      const newEvent: Event = {
        id: generateId(),
        ownerId: user.id,
        name: form.name.trim(),
        objectives: form.objectives.trim(),
        city: form.city.trim(),
        locationUrl: form.locationUrl.trim() || undefined,
        expectedAttendees: form.expectedAttendees ? Number(form.expectedAttendees) : undefined,
        eventType: form.eventType,
        startDate: form.startDate ? new Date(form.startDate) : undefined,
        endDate: form.endDate ? new Date(form.endDate) : undefined,
        createdAt: new Date(),
      };
      
      saveEvent(newEvent);
      
      toast({
        title: t('common.success'),
        description: 'Event created successfully',
      });
      
      setForm({
        name: '',
        objectives: '',
        city: '',
        locationUrl: '',
        expectedAttendees: '',
        eventType: '',
        startDate: '',
        endDate: ''
      });
      
      onEventCreated?.();
      onClose();
      
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Failed to create event',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center hero-title flex items-center justify-center gap-2">
            <Calendar className="w-6 h-6" />
            {t('event.create.title')}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event-name" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              {t('event.create.name')}
            </Label>
            <Input
              id="event-name"
              value={form.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={errors.name ? 'border-destructive' : ''}
              placeholder="Enter event name"
              required
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="event-objectives">{t('event.create.objectives')}</Label>
            <Textarea
              id="event-objectives"
              value={form.objectives}
              onChange={(e) => handleInputChange('objectives', e.target.value)}
              className={errors.objectives ? 'border-destructive' : ''}
              placeholder="Describe the event objectives"
              rows={3}
              required
            />
            {errors.objectives && <p className="text-sm text-destructive">{errors.objectives}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event-city" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {t('event.create.city')}
              </Label>
              <Input
                id="event-city"
                value={form.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={errors.city ? 'border-destructive' : ''}
                placeholder="Event city"
                required
              />
              {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expected-attendees" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {t('event.create.expectedAttendees')}
              </Label>
              <Input
                id="expected-attendees"
                type="number"
                value={form.expectedAttendees}
                onChange={(e) => handleInputChange('expectedAttendees', e.target.value)}
                className={errors.expectedAttendees ? 'border-destructive' : ''}
                placeholder="100"
                min="1"
              />
              {errors.expectedAttendees && <p className="text-sm text-destructive">{errors.expectedAttendees}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location-url">{t('event.create.locationUrl')} (Optional)</Label>
            <Input
              id="location-url"
              type="url"
              value={form.locationUrl}
              onChange={(e) => handleInputChange('locationUrl', e.target.value)}
              placeholder="https://maps.google.com/..."
            />
          </div>
          
          <div className="space-y-2">
            <Label>{t('event.create.eventType')}</Label>
            <Select
              value={form.eventType}
              onValueChange={(value) => handleInputChange('eventType', value)}
            >
              <SelectTrigger className={errors.eventType ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border max-h-60">
                {eventTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.eventType && <p className="text-sm text-destructive">{errors.eventType}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">{t('event.create.startDate')} (Optional)</Label>
              <Input
                id="start-date"
                type="datetime-local"
                value={form.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-date">{t('event.create.endDate')} (Optional)</Label>
              <Input
                id="end-date"
                type="datetime-local"
                value={form.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className={errors.endDate ? 'border-destructive' : ''}
              />
              {errors.endDate && <p className="text-sm text-destructive">{errors.endDate}</p>}
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1"
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              variant="hero"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? t('common.loading') : t('event.create.submit')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};