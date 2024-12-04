'use client';

import { useTaskStore, Task } from '@/lib/store/task-store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CheckCircle2, Circle, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-blue-500" />;
      case 'in-progress':
        return <Timer className="h-5 w-5 text-purple-500" />;
      case 'todo':
        return <Circle className="h-5 w-5 text-gray-500" />;
    }
  };

  if (tasks.length === 0) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
          No tasks yet
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Try saying "Hey Assistant, add task buy groceries"
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="p-4">
          <div className="flex items-start gap-4">
            <button
              onClick={() => updateTask(task.id, {
                status: task.status === 'completed' ? 'todo' : 'completed'
              })}
              className="mt-1"
            >
              {getStatusIcon(task.status)}
            </button>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-lg font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {task.description}
                    </p>
                  )}
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {format(task.createdAt, 'PPp')}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}