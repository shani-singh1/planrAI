import { useTaskStore, type Task } from '../store/task-store';

export class CommandProcessor {
  private static instance: CommandProcessor;

  private constructor() {}

  public static getInstance(): CommandProcessor {
    if (!CommandProcessor.instance) {
      CommandProcessor.instance = new CommandProcessor();
    }
    return CommandProcessor.instance;
  }

  public async processCommand(text: string): Promise<string | null> {
    const normalizedText = text.toLowerCase().trim();
    
    try {
      if (normalizedText.includes('add task') || normalizedText.includes('create task')) {
        return this.handleAddTask(normalizedText);
      } else if (normalizedText.includes('complete task') || normalizedText.includes('finish task')) {
        return this.handleCompleteTask(normalizedText);
      } else if (normalizedText.includes('delete task') || normalizedText.includes('remove task')) {
        return this.handleDeleteTask(normalizedText);
      } else if (normalizedText.includes('list tasks') || normalizedText.includes('show tasks')) {
        return this.handleListTasks();
      }
    } catch (error) {
      console.error('Error processing command:', error);
      return 'Sorry, there was an error processing your command.';
    }
    
    return 'Command not recognized. Try saying "add task", "complete task", or "delete task".';
  }

  private extractTaskDetails(text: string): { title: string; priority: Task['priority']; description?: string } {
    const priorityMatch = text.match(/\b(high|medium|low)\s+priority\b/);
    const priority = priorityMatch ? priorityMatch[1] as Task['priority'] : 'medium';

    // Remove priority text from the task title
    let title = text.replace(/\b(high|medium|low)\s+priority\b/, '').trim();
    // Remove command words
    title = title.replace(/^(add|create|new)\s+task\s+/i, '');

    // Extract description if provided with "with description" or "description"
    let description: string | undefined;
    const descriptionMatch = title.match(/(?:with description|description)\s+(.+)$/i);
    if (descriptionMatch) {
      description = descriptionMatch[1];
      title = title.replace(/(?:with description|description)\s+.+$/i, '').trim();
    }

    return { title, priority, description };
  }

  private async handleAddTask(text: string): Promise<string> {
    const { title, priority, description } = this.extractTaskDetails(text);

    if (!title) {
      return 'Could not understand the task title. Please try again.';
    }

    const taskStore = useTaskStore.getState();
    taskStore.addTask({
      title,
      description,
      status: 'todo',
      priority,
      tags: [],
    });

    return `Added task: "${title}" with ${priority} priority${description ? ' and description' : ''}`;
  }

  private handleCompleteTask(text: string): string {
    const taskStore = useTaskStore.getState();
    const tasks = taskStore.getTasks();
    const taskTitle = text.replace(/(?:complete|finish) task /i, '').trim();
    
    const task = tasks.find(t => t.title.toLowerCase().includes(taskTitle.toLowerCase()));
    if (task) {
      taskStore.updateTask(task.id, { status: 'completed' });
      return `Completed task: "${task.title}"`;
    }
    
    return `Task containing "${taskTitle}" not found`;
  }

  private handleDeleteTask(text: string): string {
    const taskStore = useTaskStore.getState();
    const tasks = taskStore.getTasks();
    const taskTitle = text.replace(/(?:delete|remove) task /i, '').trim();
    
    const task = tasks.find(t => t.title.toLowerCase().includes(taskTitle.toLowerCase()));
    if (task) {
      taskStore.deleteTask(task.id);
      return `Deleted task: "${task.title}"`;
    }
    
    return `Task containing "${taskTitle}" not found`;
  }

  private handleListTasks(): string {
    const taskStore = useTaskStore.getState();
    const tasks = taskStore.getTasks();
    
    if (tasks.length === 0) {
      return 'No tasks found';
    }

    const taskCount = tasks.length;
    const completedCount = tasks.filter(t => t.status === 'completed').length;
    return `You have ${taskCount} tasks, ${completedCount} completed`;
  }
}