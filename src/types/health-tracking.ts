
export type MoodType = 'happy' | 'sad' | 'irritable' | 'emotional' | 'relaxed' | 'anxious';
export type EnergyType = 'high' | 'normal' | 'low' | 'exhausted';
export type MedicationType = 'birthControl' | 'painkillers' | 'ironSupplements' | 'herbalRemedies' | 'other';

export interface MoodEntry {
  date: Date;
  mood: MoodType;
  energy: EnergyType;
  notes?: string;
}

export interface MedicationEntry {
  date: Date;
  type: MedicationType;
  name: string;
  dosage?: string;
  isScheduled: boolean; // For recurring medications
  scheduledTime?: string;
  notes?: string;
}

// Mock data for development
export const mockMoodEntries: MoodEntry[] = [
  { date: new Date(2023, 4, 1), mood: 'happy', energy: 'high' },
  { date: new Date(2023, 4, 3), mood: 'relaxed', energy: 'normal' },
  { date: new Date(2023, 4, 5), mood: 'irritable', energy: 'low' },
  { date: new Date(2023, 4, 8), mood: 'anxious', energy: 'exhausted' },
  { date: new Date(2023, 4, 12), mood: 'emotional', energy: 'low' },
  { date: new Date(2023, 4, 15), mood: 'sad', energy: 'normal' },
  { date: new Date(2023, 4, 18), mood: 'happy', energy: 'high' },
  { date: new Date(2023, 4, 22), mood: 'relaxed', energy: 'normal' },
  { date: new Date(2023, 4, 25), mood: 'happy', energy: 'high' },
  { date: new Date(2023, 4, 28), mood: 'irritable', energy: 'low' },
];

export const mockMedicationEntries: MedicationEntry[] = [
  { 
    date: new Date(2023, 4, 1), 
    type: 'birthControl', 
    name: 'Birth Control Pill', 
    isScheduled: true,
    scheduledTime: '08:00' 
  },
  { 
    date: new Date(2023, 4, 4), 
    type: 'painkillers', 
    name: 'Ibuprofen', 
    dosage: '400mg',
    isScheduled: false 
  },
  { 
    date: new Date(2023, 4, 8), 
    type: 'herbalRemedies', 
    name: 'Chamomile Tea', 
    isScheduled: false 
  },
  { 
    date: new Date(2023, 4, 12), 
    type: 'ironSupplements', 
    name: 'Iron Supplement', 
    dosage: '65mg',
    isScheduled: true,
    scheduledTime: '12:00' 
  },
  { 
    date: new Date(2023, 4, 15), 
    type: 'birthControl', 
    name: 'Birth Control Pill', 
    isScheduled: true,
    scheduledTime: '08:00' 
  },
];

export const getMoodEmoji = (mood: MoodType): string => {
  switch (mood) {
    case 'happy': return '😊';
    case 'sad': return '😔';
    case 'irritable': return '😠';
    case 'emotional': return '😢';
    case 'relaxed': return '😌';
    case 'anxious': return '😰';
  }
};

export const getEnergyEmoji = (energy: EnergyType): string => {
  switch (energy) {
    case 'high': return '⚡';
    case 'normal': return '🔋';
    case 'low': return '🛏️';
    case 'exhausted': return '😩';
  }
};

export const getMedicationEmoji = (type: MedicationType): string => {
  switch (type) {
    case 'birthControl': return '💊';
    case 'painkillers': return '🔥';
    case 'ironSupplements': return '🩸';
    case 'herbalRemedies': return '🍃';
    case 'other': return '📝';
  }
};

export const getMoodLabel = (mood: MoodType): string => {
  return mood.charAt(0).toUpperCase() + mood.slice(1);
};

export const getEnergyLabel = (energy: EnergyType): string => {
  return energy.charAt(0).toUpperCase() + energy.slice(1);
};

export const getMedicationLabel = (type: MedicationType): string => {
  switch (type) {
    case 'birthControl': return 'Birth Control';
    case 'painkillers': return 'Painkillers';
    case 'ironSupplements': return 'Iron Supplements';
    case 'herbalRemedies': return 'Herbal Remedies';
    case 'other': return 'Other';
  }
};
