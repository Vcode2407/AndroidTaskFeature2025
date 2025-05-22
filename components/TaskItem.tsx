
import React from 'react';
import { Task } from '../types';
import { EditIcon, DeleteIcon, CalendarIcon, CheckCircleIcon, CircleIcon } from './icons'; // Assuming you have these icons

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const { id, title, description, dueDate, isCompleted } = task;

  const formattedDueDate = dueDate 
    ? new Date(dueDate + 'T00:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) 
    : 'No due date';

  const cardBgClass = isCompleted 
    ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700' 
    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
  
  const titleClass = isCompleted 
    ? 'line-through text-gray-500 dark:text-gray-400' 
    : 'text-gray-900 dark:text-white';

  return (
    <div className={`shadow-lg rounded-xl p-5 transition-all duration-300 hover:shadow-xl flex flex-col justify-between ${cardBgClass}`}>
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-xl font-semibold ${titleClass}`}>{title}</h3>
          <button
            onClick={() => onToggleComplete(id)}
            className={`p-1 rounded-full focus:outline-none focus:ring-2 ${isCompleted ? 'text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-500 focus:ring-green-400' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:ring-primary'}`}
            aria-label={isCompleted ? "Mark as active" : "Mark as complete"}
          >
            {isCompleted ? <CheckCircleIcon className="w-6 h-6" /> : <CircleIcon className="w-6 h-6" />}
          </button>
        </div>
        {description && (
          <p className={`text-sm text-gray-600 dark:text-gray-300 mb-3 ${isCompleted ? 'line-through' : ''}`}>
            {description}
          </p>
        )}
        {dueDate && (
          <div className={`flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4 ${isCompleted ? 'line-through' : ''}`}>
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span>{formattedDueDate}</span>
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200 dark:border-gray-700/50">
        <button
          onClick={() => onEdit(task)}
          className="text-sm flex items-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium py-1 px-3 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
          aria-label={`Edit task ${title}`}
        >
          <EditIcon className="w-4 h-4 mr-1" /> Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-sm flex items-center text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium py-1 px-3 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          aria-label={`Delete task ${title}`}
        >
          <DeleteIcon className="w-4 h-4 mr-1" /> Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
