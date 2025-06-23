export type Priority = 'low' | 'medium' | 'high';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    category: string;
    tags: string[];
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface TaskState {
    tasks: Task[];
    categories: string[];
    tags: string[];
    loading: boolean;
    error: string | null;
} 