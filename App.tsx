
import React, { useState, useEffect, useCallback } from 'react';
import { Task } from './types';
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';
import Modal from './components/Modal';
import { PlusIcon, SunIcon, MoonIcon } from './components/icons';

const APP_STORAGE_KEY = 'reactTaskManager.tasks';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem(APP_STORAGE_KEY);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    const storedTheme = localStorage.getItem('reactTaskManager.theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Save theme preference
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('reactTaskManager.theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('reactTaskManager.theme', 'light');
    }
  }, [isDarkMode]);


  const handleOpenModalForNew = useCallback(() => {
    setEditingTask(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenModalForEdit = useCallback((task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTask(null);
  }, []);

  const handleSubmitTask = useCallback((taskData: Omit<Task, 'id' | 'isCompleted'> | Task) => {
    if ('id' in taskData) { // Editing existing task
      setTasks(prevTasks => prevTasks.map(t => t.id === taskData.id ? { ...t, ...taskData } : t));
    } else { // Adding new task
      const newTask: Task = { 
        ...taskData, 
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        isCompleted: false 
      };
      setTasks(prevTasks => [newTask, ...prevTasks]); // Add new tasks to the top
    }
    handleCloseModal();
  }, [handleCloseModal]);

  const handleDeleteTask = useCallback((taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    }
  }, []);

  const handleToggleComplete = useCallback((taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(t => 
        t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const filteredTasks = tasks
    .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(task => {
      if (filterStatus === 'active') return !task.isCompleted;
      if (filterStatus === 'completed') return task.isCompleted;
      return true;
    });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <header className="bg-primary dark:bg-blue-700 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Task Manager Pro</h1>
          <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <SunIcon className="w-6 h-6"/> : <MoonIcon className="w-6 h-6"/>}
            </button>
            <button
              onClick={handleOpenModalForNew}
              className="flex items-center bg-secondary hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-150"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Task
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Search tasks by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 transition-colors"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'completed')}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 transition-colors"
                >
                    <option value="all">All Tasks</option>
                    <option value="active">Active Tasks</option>
                    <option value="completed">Completed Tasks</option>
                </select>
            </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-10">
            <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No tasks found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {tasks.length === 0 ? "Get started by adding a new task." : "Try adjusting your search or filter."}
            </p>
            {tasks.length === 0 && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleOpenModalForNew}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-blue-500"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Task
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onEdit={handleOpenModalForEdit} 
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete} 
              />
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <Modal onClose={handleCloseModal} title={editingTask ? 'Edit Task' : 'Add New Task'}>
          <TaskForm 
            onSubmit={handleSubmitTask} 
            initialTask={editingTask}
            onClose={handleCloseModal} 
          />
        </Modal>
      )}
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-12">
        <p>&copy; {new Date().getFullYear()} React Task Manager. All rights reserved.</p>
        <p>Powered by React & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;
