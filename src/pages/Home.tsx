import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Home: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hızlı Erişim Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

                <Link to="/tasks/priority" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Öncelikli Görevler</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Önemli görevleri görün</p>
                        </div>
                        <span className="text-2xl">⭐</span>
                    </div>
                </Link>

                <Link to="/tasks/completed" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tamamlananlar</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Bitirilen görevleri görün</p>
                        </div>
                        <span className="text-2xl">✅</span>
                    </div>
                </Link>
            </div>

            {/* Son Görevler */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Son Görevler</h2>
                    <Link to="/tasks" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
                        Tümünü Gör →
                    </Link>
                </div>
                <div className="space-y-4">
                    {/* Örnek görev kartları */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Proje Raporu</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Son teslim: 15 Mart 2024</p>
                            </div>
                            <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                Devam Ediyor
                            </span>
                        </div>
                    </div>
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Toplantı Notları</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Son teslim: 10 Mart 2024</p>
                            </div>
                            <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Tamamlandı
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hızlı İstatistikler */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Toplam Görev</h3>
                    <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">24</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Devam Eden</h3>
                    <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">8</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tamamlanan</h3>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">16</p>
                </div>
            </div>
        </div>
    );
};

export default Home; 