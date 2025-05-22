
import React, { useState, useEffect } from 'react';
import { Task } from '../types';

interface TaskFormProps {
  onSubmit: (taskData: Omit<Task, 'id' | 'isCompleted'> | Task) => void;
  initialTask?: Task | null;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setDueDate(initialTask.dueDate || '');
    } else {
      // Reset form for new task
      setTitle('');
      setDescription('');
      setDueDate('');
    }
    setTitleError(''); // Clear error on initial load or task change
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError('Title is required.');
      return;
    }
    setTitleError('');

    const taskData = {
      title: title.trim(),
      description: description.trim() || undefined, // Store as undefined if empty
      dueDate: dueDate || undefined, // Store as undefined if empty
    };

    if (initialTask) {
      onSubmit({ ...initialTask, ...taskData });
    } else {
      onSubmit(taskData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-1">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Task Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value.trim()) setTitleError('');
          }}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 transition-colors"
          placeholder="e.g., Buy groceries"
        />
        {titleError && <p className="text-red-500 text-xs mt-1">{titleError}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description (Optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 transition-colors"
          placeholder="e.g., Milk, eggs, bread"
        ></textarea>
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Due Date (Optional)
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 transition-colors"
          min={new Date().toISOString().split('T')[0]} // Prevent past dates
        />
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="py-2 px-4 border border-gray-300 dark:border-gray-500 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-primary hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-blue-500 transition-colors"
        >
          {initialTask ? 'Save Changes' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
