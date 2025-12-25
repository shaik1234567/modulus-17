import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './types';

type SortType = 'priority' | 'deadline' | 'createdAt';

interface TasksState {
  tasks: Task[];
  sortType: SortType;
}

const initialState: TasksState = {
  tasks: [],
  sortType: 'createdAt',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    toggleTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
  },
});

export const { addTask, toggleTask, deleteTask, setSortType } = tasksSlice.actions;
export default tasksSlice.reducer;
