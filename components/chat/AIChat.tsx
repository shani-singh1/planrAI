'use client';

import { useState } from 'react';
import { useTaskStore } from '@/lib/store/task-store';
import { TaskAI } from '@/lib/ai/task-ai';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Wand2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);
  const taskAI = TaskAI.getInstance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsProcessing(true);

    try {
      const aiResponse = await taskAI.processInput(userMessage);
      
      if (aiResponse.action === 'create' && aiResponse.tasks.length > 0) {
        aiResponse.tasks.forEach(task => {
          addTask({
            title: task.title,
            description: task.description,
            status: 'todo',
            priority: task.priority,
            tags: task.tags,
            dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
          });
        });
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiResponse.context || 'Task processed successfully.'
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I had trouble processing that request.'
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="flex flex-col h-[400px]">
      <ScrollArea className="flex-1 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'assistant'
                ? 'bg-secondary p-3 rounded-lg'
                : 'bg-primary text-primary-foreground p-3 rounded-lg'
            }`}
          >
            {message.content}
          </div>
        ))}
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your task or ask for help..."
            className="min-h-[80px]"
          />
          <Button 
            type="submit" 
            disabled={isProcessing}
            className="self-end"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            Process
          </Button>
        </div>
      </form>
    </Card>
  );
}