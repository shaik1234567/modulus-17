// src/store/types.ts

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
}

export interface AppState {
  tasks: Task[];
}
