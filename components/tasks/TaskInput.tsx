'use client';

import { useState } from 'react';
import { useTaskStore } from '@/lib/store/task-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export function TaskInput() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isExpanded, setIsExpanded] = useState(false);
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      status: 'todo',
      priority,
      tags: [],
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setIsExpanded(false);
  };

  return (
    <Card className="p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <Input
            placeholder="Type your task here or use voice commands..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={() => setIsExpanded(true)}
          />
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {isExpanded && (
          <div className="space-y-4 mt-4">
            <Textarea
              placeholder="Add description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-between items-center">
              <Select
                value={priority}
                onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                type="button" 
                variant="ghost"
                onClick={() => setIsExpanded(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </form>
    </Card>
  );
}