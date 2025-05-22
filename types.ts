
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string; // Store as YYYY-MM-DD string
  isCompleted: boolean;
}
