import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleLogoClick = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow transition-colors duration-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <button
                                onClick={handleLogoClick}
                                className="text-xl font-bold text-primary-600 dark:text-primary-400 transition-colors duration-700 hover:text-primary-700 dark:hover:text-primary-300"
                            >
                                TaskManager
                            </button>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/dashboard"
                                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-700"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/tasks"
                                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-700"
                            >
                                Görevler
                            </Link>
                            <Link
                                to="/tasks/new"
                                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-700"
                            >
                                Yeni Görev
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <button
                            onClick={toggleTheme}
                            className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-700 transform hover:scale-110"
                        >
                            {theme === 'dark' ? (
                                <svg className="h-6 w-6 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            )}
                        </button>
                        <div className="ml-3 relative">
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/profile"
                                    className="text-gray-500 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-700"
                                >
                                    {user?.name}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-500 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-700"
                                >
                                    Çıkış Yap
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 