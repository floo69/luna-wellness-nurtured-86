
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MedicationType, getMedicationEmoji, getMedicationLabel } from '@/types/health-tracking';
import { Calendar } from "@/components/ui/calendar";
import { Pill, Clock, CalendarIcon, RefreshCw, Check } from 'lucide-react';
import { format } from 'date-fns';
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { mockMedicationEntries } from '@/types/health-tracking';

interface MedicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: {
    type: MedicationType;
    name: string;
    dosage?: string;
    date: Date;
    isScheduled: boolean;
    scheduledTime?: string;
    notes?: string;
  }) => void;
}

const MedicationDialog: React.FC<MedicationDialogProps> = ({ open, onOpenChange, onSave }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [type, setType] = useState<MedicationType>('birthControl');
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('08:00');
  const [notes, setNotes] = useState('');
  const [currentView, setCurrentView] = useState<'form' | 'history'>('form');

  const handleSubmit = () => {
    onSave({
      type,
      name,
      dosage: dosage.trim() !== '' ? dosage : undefined,
      date,
      isScheduled,
      scheduledTime: isScheduled ? scheduledTime : undefined,
      notes: notes.trim() !== '' ? notes : undefined
    });
    onOpenChange(false);
    // Reset form
    setType('birthControl');
    setName('');
    setDosage('');
    setDate(new Date());
    setIsScheduled(false);
    setScheduledTime('08:00');
    setNotes('');
  };

  const medicationOptions: { value: MedicationType; label: string; emoji: string }[] = [
    { value: 'birthControl', label: 'Birth Control', emoji: getMedicationEmoji('birthControl') },
    { value: 'painkillers', label: 'Painkillers', emoji: getMedicationEmoji('painkillers') },
    { value: 'ironSupplements', label: 'Iron Supplements', emoji: getMedicationEmoji('ironSupplements') },
    { value: 'herbalRemedies', label: 'Herbal Remedies', emoji: getMedicationEmoji('herbalRemedies') },
    { value: 'other', label: 'Other', emoji: getMedicationEmoji('other') },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Log Medication</DialogTitle>
          <DialogDescription>
            Keep track of your medications and supplements.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center space-x-2 my-2">
          <Button 
            variant={currentView === 'form' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setCurrentView('form')}
          >
            Log Medication
          </Button>
          <Button 
            variant={currentView === 'history' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setCurrentView('history')}
          >
            Medication History
          </Button>
        </div>

        {currentView === 'form' ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date Taken</Label>
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
                <Pill className="h-4 w-4 mr-2" />
                Medication Type
              </Label>
              <RadioGroup
                value={type}
                onValueChange={(value) => setType(value as MedicationType)}
                className="grid grid-cols-3 gap-2"
              >
                {medicationOptions.map((option) => (
                  <div key={option.value} className="flex flex-col items-center">
                    <RadioGroupItem
                      value={option.value}
                      id={`med-${option.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`med-${option.value}`}
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
              <Label htmlFor="name">Medication Name</Label>
              <Input
                id="name"
                placeholder="Enter medication name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage (Optional)</Label>
              <Input
                id="dosage"
                placeholder="e.g., 400mg, 1 tablet"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="scheduled"
                checked={isScheduled}
                onCheckedChange={setIsScheduled}
              />
              <Label htmlFor="scheduled" className="cursor-pointer">
                Scheduled / Recurring Medication
              </Label>
            </div>

            {isScheduled && (
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Scheduled Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about this medication..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div className="rounded-lg bg-green-50 p-3">
              <h4 className="font-medium text-green-800">Cycle Insight</h4>
              <p className="text-sm text-gray-600 mt-1">
                You're currently in the <strong>luteal phase</strong> of your cycle. Many women experience more inflammation and discomfort during this time. If you're taking anti-inflammatory medications, be sure to stay hydrated and monitor your symptoms.
              </p>
            </div>
          </div>
        ) : (
          <div className="py-2">
            <h3 className="text-sm font-medium mb-3">Recent Medications</h3>
            
            <div className="space-y-3">
              {mockMedicationEntries.map((entry, index) => (
                <div key={index} className="flex items-start border rounded-md p-3">
                  <div className="text-2xl mr-3">{getMedicationEmoji(entry.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{entry.name}</h4>
                      <span className="text-xs text-gray-500">{format(new Date(entry.date), 'MMM dd')}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {entry.dosage && <span className="mr-2">{entry.dosage}</span>}
                      <span>{getMedicationLabel(entry.type)}</span>
                    </div>
                    {entry.isScheduled && (
                      <div className="flex items-center text-xs text-blue-600 mt-1">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Scheduled daily at {entry.scheduledTime}
                      </div>
                    )}
                  </div>
                  {entry.isScheduled && <Check className="h-4 w-4 text-green-500" />}
                </div>
              ))}
            </div>
            
            <div className="rounded-lg bg-amber-50 p-3 mt-4">
              <h4 className="font-medium text-amber-800">Medication Insight</h4>
              <p className="text-sm text-gray-600 mt-1">
                You've taken painkillers 3 times this cycle. If you frequently experience pain that requires medication, consider discussing with your healthcare provider at your next visit.
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
                disabled={!name.trim()}
              >
                Save
              </Button>
            </>
          )}
          {currentView === 'history' && (
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

export default MedicationDialog;
