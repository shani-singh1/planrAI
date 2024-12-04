import OpenAI from 'openai';

export interface AITaskResponse {
  action: 'create' | 'update' | 'delete' | 'list' | 'unknown';
  tasks: {
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    tags: string[];
    dueDate?: string;
  }[];
  context?: string;
  error?: string;
}

export class TaskAI {
  private static instance: TaskAI;
  private openai: OpenAI;

  private constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }

  public static getInstance(): TaskAI {
    if (!TaskAI.instance) {
      TaskAI.instance = new TaskAI();
    }
    return TaskAI.instance;
  }

  public async processInput(input: string): Promise<AITaskResponse> {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `You are an AI task management assistant. Parse user input and return structured task data. 
            Understand context, priorities, deadlines, and relationships between tasks.
            Respond in JSON format matching the AITaskResponse interface.`
          },
          {
            role: 'user',
            content: input
          }
        ],
        model: 'gpt-3.5-turbo-0125',
        response_format: { type: 'json_object' }
      });

      const response = JSON.parse(completion.choices[0].message.content || '{}');
      return this.validateResponse(response);
    } catch (error) {
      console.error('AI processing error:', error);
      return {
        action: 'unknown',
        tasks: [],
        error: 'Failed to process input with AI'
      };
    }
  }

  private validateResponse(response: any): AITaskResponse {
    // Add validation logic here
    return response;
  }
}