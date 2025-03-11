
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { MoodEntry, getMoodLabel, getEnergyLabel } from '@/types/health-tracking';
import { format } from 'date-fns';

interface MoodEnergyChartProps {
  data: MoodEntry[];
}

const MoodEnergyChart: React.FC<MoodEnergyChartProps> = ({ data }) => {
  const chartData = data.map(entry => {
    const moodValue = getMoodValue(entry.mood);
    const energyValue = getEnergyValue(entry.energy);
    
    return {
      date: format(new Date(entry.date), 'MMM dd'),
      mood: moodValue,
      energy: energyValue,
      moodLabel: getMoodLabel(entry.mood),
      energyLabel: getEnergyLabel(entry.energy),
    };
  });

  // Ensure data is sorted by date
  chartData.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="w-full h-64 mt-4">
      <ChartContainer 
        config={{
          mood: {
            label: "Mood",
            color: "#D946EF" // Pink
          },
          energy: {
            label: "Energy",
            color: "#0EA5E9" // Blue
          }
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis 
              domain={[0, 10]} 
              ticks={[0, 2, 4, 6, 8, 10]}
              tickFormatter={(value) => getMoodEnergyLabel(value)}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="font-medium">{label}</div>
                        <div></div>
                        {payload.map((entry, index) => (
                          <React.Fragment key={index}>
                            <div className="flex items-center gap-1">
                              <div
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span>{entry.name === 'mood' ? 'Mood' : 'Energy'}</span>
                            </div>
                            <div className="text-right font-medium">
                              {entry.name === 'mood' 
                                ? payload[0].payload.moodLabel 
                                : payload[0].payload.energyLabel}
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="mood" 
              name="Mood" 
              stroke="#D946EF" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="energy" 
              name="Energy" 
              stroke="#0EA5E9" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

// Helper functions for chart data
const getMoodValue = (mood: string): number => {
  switch (mood) {
    case 'happy': return 10;
    case 'relaxed': return 8;
    case 'emotional': return 6;
    case 'irritable': return 4;
    case 'anxious': return 2;
    case 'sad': return 0;
    default: return 5;
  }
};

const getEnergyValue = (energy: string): number => {
  switch (energy) {
    case 'high': return 10;
    case 'normal': return 7;
    case 'low': return 4;
    case 'exhausted': return 1;
    default: return 5;
  }
};

const getMoodEnergyLabel = (value: number): string => {
  if (value >= 9) return 'Excellent';
  if (value >= 7) return 'Good';
  if (value >= 5) return 'Moderate';
  if (value >= 3) return 'Low';
  return 'Poor';
};

export default MoodEnergyChart;
