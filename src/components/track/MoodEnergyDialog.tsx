
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Smile, Frown, Zap, Battery } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoodType, EnergyType, getMoodEmoji, getEnergyEmoji } from '@/types/health-tracking';
import { cn } from '@/lib/utils';
import MoodEnergyChart from '@/components/charts/MoodEnergyChart';
import { mockMoodEntries } from '@/types/health-tracking';

interface MoodEnergyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: { mood: MoodType; energy: EnergyType; date: Date; notes?: string }) => void;
}

const MoodEnergyDialog: React.FC<MoodEnergyDialogProps> = ({ open, onOpenChange, onSave }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [mood, setMood] = useState<MoodType>('happy');
  const [energy, setEnergy] = useState<EnergyType>('normal');
  const [notes, setNotes] = useState('');
  const [currentView, setCurrentView] = useState<'form' | 'trends'>('form');

  const handleSubmit = () => {
    onSave({ mood, energy, date, notes: notes.trim() !== '' ? notes : undefined });
    onOpenChange(false);
    // Reset form
    setMood('happy');
    setEnergy('normal');
    setNotes('');
    setDate(new Date());
  };

  const moodOptions: { value: MoodType; label: string; emoji: string }[] = [
    { value: 'happy', label: 'Happy', emoji: getMoodEmoji('happy') },
    { value: 'relaxed', label: 'Relaxed', emoji: getMoodEmoji('relaxed') },
    { value: 'sad', label: 'Sad', emoji: getMoodEmoji('sad') },
    { value: 'irritable', label: 'Irritable', emoji: getMoodEmoji('irritable') },
    { value: 'emotional', label: 'Emotional', emoji: getMoodEmoji('emotional') },
    { value: 'anxious', label: 'Anxious', emoji: getMoodEmoji('anxious') },
  ];

  const energyOptions: { value: EnergyType; label: string; emoji: string }[] = [
    { value: 'high', label: 'High', emoji: getEnergyEmoji('high') },
    { value: 'normal', label: 'Normal', emoji: getEnergyEmoji('normal') },
    { value: 'low', label: 'Low', emoji: getEnergyEmoji('low') },
    { value: 'exhausted', label: 'Exhausted', emoji: getEnergyEmoji('exhausted') },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log Mood & Energy</DialogTitle>
          <DialogDescription>
            Track how you're feeling today to identify patterns throughout your cycle.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center space-x-2 my-2">
          <Button 
            variant={currentView === 'form' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setCurrentView('form')}
          >
            Log Entry
          </Button>
          <Button 
            variant={currentView === 'trends' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setCurrentView('trends')}
          >
            View Trends
          </Button>
        </div>

        {currentView === 'form' ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center">
                <Smile className="h-4 w-4 mr-2" />
                Mood
              </Label>
              <RadioGroup
                value={mood}
                onValueChange={(value) => setMood(value as MoodType)}
                className="grid grid-cols-3 gap-2"
              >
                {moodOptions.map((option) => (
                  <div key={option.value} className="flex flex-col items-center">
                    <RadioGroupItem
                      value={option.value}
                      id={`mood-${option.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`mood-${option.value}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="text-2xl mb-1">{option.emoji}</div>
                      <span className="text-xs">{option.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Energy Level
              </Label>
              <RadioGroup
                value={energy}
                onValueChange={(value) => setEnergy(value as EnergyType)}
                className="grid grid-cols-2 gap-2"
              >
                {energyOptions.map((option) => (
                  <div key={option.value} className="flex flex-col items-center">
                    <RadioGroupItem
                      value={option.value}
                      id={`energy-${option.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`energy-${option.value}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="text-2xl mb-1">{option.emoji}</div>
                      <span className="text-xs">{option.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about how you're feeling..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div className="rounded-lg bg-blue-50 p-3">
              <h4 className="font-medium text-blue-800">Cycle Insight</h4>
              <p className="text-sm text-gray-600 mt-1">
                Based on your cycle tracking, you're likely in your <strong>ovulation phase</strong>. This is when many women experience improved mood and energy levels. It's a great time for physical activity and socializing!
              </p>
            </div>
          </div>
        ) : (
          <div className="py-2">
            <h3 className="text-sm font-medium text-center mb-2">Your Mood & Energy Trends</h3>
            <MoodEnergyChart data={mockMoodEntries} />
            
            <div className="rounded-lg bg-purple-50 p-3 mt-4">
              <h4 className="font-medium text-purple-800">Pattern Detected</h4>
              <p className="text-sm text-gray-600 mt-1">
                Your mood usually dips 3-4 days before your period starts. Consider increasing magnesium-rich foods and hydration during this time to help balance your mood.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          {currentView === 'form' && (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                className="bg-luna-purple hover:bg-purple-600"
              >
                Save
              </Button>
            </>
          )}
          {currentView === 'trends' && (
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MoodEnergyDialog;
