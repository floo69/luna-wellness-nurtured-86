
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import { Calendar, Plus, Droplets, Activity, Moon, Pill, CalendarDays, Heart, RefreshCw } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

// Import new components
import MoodEnergyDialog from '@/components/track/MoodEnergyDialog';
import MedicationDialog from '@/components/track/MedicationDialog';
import { MoodType, EnergyType, MedicationType } from '@/types/health-tracking';

const Track = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Sarah');
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [flowIntensity, setFlowIntensity] = useState('medium');
  const [symptomSearch, setSymptomSearch] = useState('');
  
  // Simulated data for the calendar
  const today = new Date();
  const currentDay = today.getDate();
  
  // Common symptoms list
  const commonSymptoms = [
    { id: 'cramps', name: 'Cramps', selected: false },
    { id: 'headache', name: 'Headache', selected: false },
    { id: 'bloating', name: 'Bloating', selected: false },
    { id: 'fatigue', name: 'Fatigue', selected: false },
    { id: 'mood-swings', name: 'Mood Swings', selected: false },
    { id: 'tender-breasts', name: 'Tender Breasts', selected: false },
    { id: 'back-pain', name: 'Back Pain', selected: false },
    { id: 'acne', name: 'Acne', selected: false },
  ];
  
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  
  const handleLogPeriod = () => {
    toast({
      title: "Period logged successfully",
      description: `You've logged your period with ${flowIntensity} flow intensity.`,
    });
    setOpenDialog(null);
  };
  
  const handleLogSymptoms = () => {
    toast({
      title: "Symptoms logged successfully",
      description: `You've logged ${selectedSymptoms.length} symptoms.`,
    });
    setOpenDialog(null);
    setSelectedSymptoms([]);
  };

  const handleLogMoodEnergy = (data: { mood: MoodType; energy: EnergyType; date: Date; notes?: string }) => {
    toast({
      title: "Mood & Energy logged successfully",
      description: `You've logged your mood as "${data.mood}" and energy as "${data.energy}".`,
    });
  };

  const handleLogMedication = (data: {
    type: MedicationType;
    name: string;
    dosage?: string;
    date: Date;
    isScheduled: boolean;
    scheduledTime?: string;
    notes?: string;
  }) => {
    toast({
      title: "Medication logged successfully",
      description: `You've logged ${data.name} ${data.dosage ? `(${data.dosage})` : ''}.`,
    });
  };
  
  const toggleSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };
  
  const filteredSymptoms = symptomSearch.length > 0 
    ? commonSymptoms.filter(s => s.name.toLowerCase().includes(symptomSearch.toLowerCase()))
    : commonSymptoms;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-luna-lavender/10 to-luna-peach/10">
      <DashboardHeader userName={userName} />
      
      <main className="container px-4 pb-24 pt-20 mx-auto max-w-5xl">
        <section className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Track Your Cycle
          </h1>
          <p className="text-gray-600 mt-1">Log symptoms, track your period, and gain insights.</p>
        </section>
        
        {/* Calendar View Section */}
        <section className="mb-8">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-luna-purple" />
                  Cycle Calendar
                </h2>
                <div className="text-sm text-gray-500">
                  May 2023
                </div>
              </div>
              
              {/* Simplified Calendar - In a real app, use a proper calendar component */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const dayNum = i - 2; // Offset to start month correctly
                  return (
                    <div 
                      key={i} 
                      className={`rounded-full w-10 h-10 flex items-center justify-center mx-auto text-sm
                      ${dayNum === currentDay ? 'bg-luna-purple text-white' : 
                        dayNum > 0 && dayNum <= 31 ? 'hover:bg-gray-100 cursor-pointer' : 'text-gray-300'}`}
                    >
                      {dayNum > 0 && dayNum <= 31 ? dayNum : ''}
                    </div>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-red-400"></span>
                  Period
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-pink-300"></span>
                  Fertile Window
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-purple-400"></span>
                  Ovulation
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-blue-300"></span>
                  PMS
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Quick Actions for Tracking */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Add</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAddCard 
              icon={<Droplets className="h-5 w-5 text-red-400" />}
              title="Log Period"
              description="Add first day or flow intensity"
              color="bg-red-50"
              onClick={() => setOpenDialog('period')}
            />
            <QuickAddCard 
              icon={<Plus className="h-5 w-5 text-purple-500" />}
              title="Log Symptoms"
              description="Cramps, headache, bloating, etc."
              color="bg-purple-50"
              onClick={() => setOpenDialog('symptoms')}
            />
            <QuickAddCard 
              icon={<Activity className="h-5 w-5 text-blue-500" />}
              title="Log Mood & Energy"
              description="Track emotional changes"
              color="bg-blue-50"
              onClick={() => setOpenDialog('mood')}
            />
            <QuickAddCard 
              icon={<Pill className="h-5 w-5 text-green-500" />}
              title="Log Medication"
              description="Birth control, supplements, etc."
              color="bg-green-50"
              onClick={() => setOpenDialog('medication')}
            />
          </div>
        </section>
        
        {/* Recent Logs & Insights */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity & Insights</h2>
          
          <Tabs defaultValue="logs">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="logs">Recent Logs</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
            <TabsContent value="logs">
              <Card className="border-none shadow-md">
                <CardContent className="p-4 space-y-3">
                  <LogItem 
                    date="Today" 
                    title="Logged Symptoms" 
                    description="Mild cramps, fatigue, bloating"
                    icon={<Plus className="h-4 w-4 text-purple-500" />}
                  />
                  <LogItem 
                    date="Yesterday" 
                    title="Logged Mood" 
                    description="Energetic in morning, tired in evening"
                    icon={<Activity className="h-4 w-4 text-blue-500" />}
                  />
                  <LogItem 
                    date="3 days ago" 
                    title="Logged Period End" 
                    description="Flow stopped after 5 days"
                    icon={<Droplets className="h-4 w-4 text-red-400" />}
                  />
                  <Button variant="outline" className="w-full">View All Activity</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="insights">
              <Card className="border-none shadow-md">
                <CardContent className="p-4 space-y-3">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Moon className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-purple-800">Trending Symptoms</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          We've noticed you experience mild headaches about 3 days before your period starts. This could be related to hormonal changes during the luteal phase.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Activity className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Energy Patterns</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Your energy levels tend to peak during the follicular phase. This is a great time for high-intensity workouts and creative activities.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Pill className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">Supplement Suggestion</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Your symptoms suggest possible magnesium deficiency. Consider magnesium-rich foods or supplements, especially during your luteal phase.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Wearable Integration */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Connect Wearable Devices</h2>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 mb-2">Sync with your health apps</h3>
                  <p className="text-sm text-gray-600">
                    Connect Luna with Apple Health, Fitbit, or Oura Ring to automatically import your temperature, sleep, and activity data for more accurate predictions.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Apple Health
                  </Button>
                  <Button className="bg-luna-purple hover:bg-purple-600 flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <DashboardFooter />
      
      {/* Period Logging Dialog */}
      <Dialog open={openDialog === 'period'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log Your Period</DialogTitle>
            <DialogDescription>
              Record the details of your period to get more accurate predictions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                type="date" 
                defaultValue={today.toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label>Flow Intensity</Label>
              <RadioGroup 
                value={flowIntensity} 
                onValueChange={setFlowIntensity}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="heavy" id="heavy" />
                  <Label htmlFor="heavy">Heavy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spotting" id="spotting" />
                  <Label htmlFor="spotting">Spotting</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpenDialog(null)}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleLogPeriod}
              className="bg-luna-purple hover:bg-purple-600"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Symptoms Logging Dialog */}
      <Dialog open={openDialog === 'symptoms'} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log Your Symptoms</DialogTitle>
            <DialogDescription>
              Select the symptoms you're experiencing today.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="symptom-search">Search Symptoms</Label>
              <Input 
                id="symptom-search" 
                placeholder="Search for symptoms..." 
                value={symptomSearch}
                onChange={(e) => setSymptomSearch(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {filteredSymptoms.map((symptom) => (
                <div 
                  key={symptom.id}
                  className={`p-2 rounded-md border cursor-pointer transition-colors
                    ${selectedSymptoms.includes(symptom.id) 
                      ? 'border-luna-purple bg-luna-lavender/20' 
                      : 'border-gray-200 hover:bg-gray-50'}`}
                  onClick={() => toggleSymptom(symptom.id)}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 
                      ${selectedSymptoms.includes(symptom.id) 
                        ? 'bg-luna-purple' 
                        : 'bg-gray-200'}`}
                    />
                    <span className="text-sm">{symptom.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpenDialog(null)}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleLogSymptoms}
              className="bg-luna-purple hover:bg-purple-600"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Mood & Energy Dialog */}
      <MoodEnergyDialog 
        open={openDialog === 'mood'} 
        onOpenChange={() => setOpenDialog(null)}
        onSave={handleLogMoodEnergy}
      />
      
      {/* Medication Dialog */}
      <MedicationDialog 
        open={openDialog === 'medication'} 
        onOpenChange={() => setOpenDialog(null)}
        onSave={handleLogMedication}
      />
    </div>
  );
};

interface QuickAddCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick?: () => void;
}

const QuickAddCard: React.FC<QuickAddCardProps> = ({ icon, title, description, color, onClick }) => {
  return (
    <Card 
      className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className={`p-4 ${color} rounded-lg h-full`}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-2">
            {icon}
          </div>
          <h3 className="font-medium text-gray-800">{title}</h3>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface LogItemProps {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const LogItem: React.FC<LogItemProps> = ({ date, title, description, icon }) => {
  return (
    <div className="flex items-start gap-3 border-b border-gray-100 pb-3">
      <div className="bg-gray-100 p-2 rounded-full">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium text-gray-800">{title}</h4>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default Track;
