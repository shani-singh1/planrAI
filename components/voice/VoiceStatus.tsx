'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Wand2 } from 'lucide-react';

interface VoiceStatusProps {
  isListening: boolean;
  lastCommand?: string;
  lastTranscript?: string;
}

export function VoiceStatus({ isListening, lastCommand, lastTranscript }: VoiceStatusProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
      }, 500);
      return () => clearInterval(interval);
    }
    setDots('');
  }, [isListening]);

  return (
    <Card className="fixed bottom-20 right-4 p-4 w-80 bg-opacity-90 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2">
        {isListening ? (
          <Mic className="h-5 w-5 text-green-500 animate-pulse" />
        ) : (
          <MicOff className="h-5 w-5 text-gray-400" />
        )}
        <span className="font-medium">
          {isListening ? `Listening${dots}` : 'Click mic to start'}
        </span>
      </div>
      {isListening && (
        <div className="text-sm text-muted-foreground">
          Say "Hey Assistant" followed by your command
        </div>
      )}
      {lastTranscript && (
        <div className="mt-2 pt-2 border-t">
          <div className="text-sm font-medium text-muted-foreground">Heard:</div>
          <div className="text-sm mt-1">{lastTranscript}</div>
        </div>
      )}
      {lastCommand && (
        <div className="mt-2 pt-2 border-t flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">Command: {lastCommand}</span>
        </div>
      )}
    </Card>
  );
}