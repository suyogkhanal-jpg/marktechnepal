import { useCountAnimation } from '@/hooks/useCountAnimation';
import { Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AnimatedCircularCounterProps {
  value: number;
  label?: string;
}

export function AnimatedCircularCounter({ value, label = 'Total Customers' }: AnimatedCircularCounterProps) {
  const { count, progress } = useCountAnimation(value, 2000);
  
  // Circle properties
  const size = 100;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Card className="shadow-card bg-gradient-to-br from-primary/10 to-primary/5">
      <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[140px]">
        <div className="relative">
          {/* Background circle */}
          <svg 
            width={size} 
            height={size} 
            className="transform -rotate-90"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(var(--primary) / 0.2)"
              strokeWidth={strokeWidth}
            />
            {/* Animated progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-100 ease-out"
            />
          </svg>
          
          {/* Counter in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary tabular-nums">
              {count.toLocaleString()}
            </span>
          </div>
        </div>
        
        {/* Label */}
        <div className="flex items-center gap-1.5 mt-3 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{label}</span>
        </div>
      </CardContent>
    </Card>
  );
}
