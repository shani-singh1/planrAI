'use client';

import { useEffect, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { voiceRecognition } from '@/lib/voice/speech-recognition';
import { CommandProcessor } from '@/lib/voice/command-processor';
import { wakeWordDetector } from '@/lib/voice/wake-word-detector';
import { useToast } from '@/hooks/use-toast';
import { VoiceStatus } from './VoiceStatus';

export function VoiceControl() {
  const [isListening, setIsListening] = useState(false);
  const [processor, setProcessor] = useState<CommandProcessor | null>(null);
  const [lastCommand, setLastCommand] = useState<string>();
  const [lastTranscript, setLastTranscript] = useState<string>();
  const { toast } = useToast();

  useEffect(() => {
    setProcessor(CommandProcessor.getInstance());
  }, []);

  const handleVoiceInput = async (text: string) => {
    if (!processor) return;

    setLastTranscript(text);
    
    if (wakeWordDetector.detectWakeWord(text)) {
      const command = wakeWordDetector.getCommandAfterWakeWord();
      if (command) {
        setLastCommand(command);
        const result = await processor.processCommand(command);
        if (result) {
          toast({
            title: 'Command Processed',
            description: result,
          });
        }
      }
    }
  };

  const toggleListening = () => {
    if (!voiceRecognition.isSupported()) {
      toast({
        title: 'Speech Recognition Not Supported',
        description: 'Your browser does not support speech recognition.',
        variant: 'destructive',
      });
      return;
    }

    if (!isListening) {
      voiceRecognition.startListening(
        handleVoiceInput,
        (error) => {
          toast({
            title: 'Error',
            description: 'An error occurred while processing voice input.',
            variant: 'destructive',
          });
        }
      );
      setIsListening(true);
    } else {
      voiceRecognition.stopListening();
      setIsListening(false);
      setLastCommand(undefined);
      setLastTranscript(undefined);
    }
  };

  return (
    <>
      <VoiceStatus 
        isListening={isListening} 
        lastCommand={lastCommand}
        lastTranscript={lastTranscript}
      />
      <Button
        onClick={toggleListening}
        variant={isListening ? 'destructive' : 'default'}
        size="icon"
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-shadow"
      >
        {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
      </Button>
    </>
  );
}