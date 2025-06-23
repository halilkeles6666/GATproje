import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useTheme } from '../context/ThemeContext';
import { Task } from '../store/slices/tasksSlice';

const Dashboard: React.FC = () => {
    const { theme } = useTheme();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    // Görev istatistikleri
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const pendingTasks = tasks.filter(task => task.status === 'pending').length;
    const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length;

    // Öncelikli görevler (yüksek öncelikli ve tamamlanmamış)
    const priorityTasks = tasks.filter(task =>
        task.priority === 'high' && task.status !== 'completed'
    );

    // Tamamlanan görevler
    const completedTasksList = tasks.filter(task => task.status === 'completed');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hızlı Erişim Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                <Link to="/tasks" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tüm Görevler</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Görevlerinizi görüntüleyin</p>
                        </div>
                        <span className="text-2xl">📋</span>
                    </div>
                </Link>

                <Link to="/tasks/new" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Yeni Görev</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Yeni görev oluşturun</p>
                        </div>
                        <span className="text-2xl">➕</span>
                    </div>
                </Link>
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Toplam Görev</h3>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalTasks}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tamamlanan</h3>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">{completedTasks}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bekleyen</h3>
                    <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{pendingTasks}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Devam Eden</h3>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{inProgressTasks}</p>
                </div>
            </div>

            {/* Görev Listeleri */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Öncelikli Görevler */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Öncelikli Görevler
                    </h2>
                    {priorityTasks.length > 0 ? (
                        <ul className="space-y-4">
                            {priorityTasks.map(task => (
                                <li
                                    key={task.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full"></span>
                                        <span className="text-gray-900 dark:text-white">{task.title}</span>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(task.dueDate).toLocaleDateString('tr-TR')}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            Öncelikli görev bulunmuyor.
                        </p>
                    )}
                </div>

                {/* Tamamlanan Görevler */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Tamamlanan Görevler
                    </h2>
                    {completedTasksList.length > 0 ? (
                        <ul className="space-y-4">
                            {completedTasksList.map(task => (
                                <li
                                    key={task.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                >
                                    <div className="flex items-center space-x-3">
                                        <svg
                                            className="h-5 w-5 text-green-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-gray-900 dark:text-white line-through">
                                            {task.title}
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(task.updatedAt).toLocaleDateString('tr-TR')}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            Tamamlanan görev bulunmuyor.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 