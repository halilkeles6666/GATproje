import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Comment {
    id: string;
    taskId: string;
    text: string;
    createdAt: string;
    author: string;
}

export interface Subtask {
    id: string;
    taskId: string;
    title: string;
    completed: boolean;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    assignedTo?: string;
    createdAt: string;
    updatedAt: string;
    completed: boolean;
    category: string;
    tags: string[];
}

interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    comments: Comment[];
    subtasks: Subtask[];
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
    comments: [],
    subtasks: []
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
            state.loading = false;
            state.error = null;
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload);
        },
        deleteComment: (state, action: PayloadAction<string>) => {
            state.comments = state.comments.filter(comment => comment.id !== action.payload);
        },
        addSubtask: (state, action: PayloadAction<Subtask>) => {
            state.subtasks.push(action.payload);
        },
        updateSubtask: (state, action: PayloadAction<Subtask>) => {
            const index = state.subtasks.findIndex(subtask => subtask.id === action.payload.id);
            if (index !== -1) {
                state.subtasks[index] = action.payload;
            }
        },
        deleteSubtask: (state, action: PayloadAction<string>) => {
            state.subtasks = state.subtasks.filter(subtask => subtask.id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        updateTaskStatus: (state, action: PayloadAction<{ id: string; status: 'pending' | 'in_progress' | 'completed' }>) => {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                task.status = action.payload.status;
            }
        },
    },
});

export const {
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    addComment,
    deleteComment,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    setLoading,
    setError,
    updateTaskStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer; 