import { VoiceControl } from '@/components/voice/VoiceControl';
import { TaskList } from '@/components/tasks/TaskList';
import { AIChat } from '@/components/chat/AIChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">AI Task Manager</h1>
          <p className="text-muted-foreground mt-2">
            Chat with AI to manage your tasks or use voice commands
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <AIChat />
          <TaskList />
        </div>
        <VoiceControl />
      </main>
    </div>
  );
}