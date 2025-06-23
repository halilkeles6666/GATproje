import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setTheme, toggleNotifications, setLanguage } from '../store/slices/settingsSlice';
import { useTheme } from '../context/ThemeContext';

const Settings: React.FC = () => {
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const settings = useSelector((state: RootState) => state.settings);

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
        dispatch(setTheme(newTheme));
    };

    const handleNotificationsToggle = () => {
        dispatch(toggleNotifications());
    };

    const handleLanguageChange = (newLanguage: string) => {
        dispatch(setLanguage(newLanguage));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Ayarlar
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                        Uygulama ayarlarınızı buradan yönetebilirsiniz.
                    </p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700">
                    <dl>
                        {/* Tema Ayarı */}
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Tema
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleThemeChange('light')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium ${settings.theme === 'light'
                                            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        Açık
                                    </button>
                                    <button
                                        onClick={() => handleThemeChange('dark')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium ${settings.theme === 'dark'
                                            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        Koyu
                                    </button>
                                </div>
                            </dd>
                        </div>

                        {/* Bildirim Ayarı */}
                        <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Bildirimler
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        onClick={handleNotificationsToggle}
                                        className={`${settings.notifications ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                                            } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                                    >
                                        <span
                                            className={`${settings.notifications ? 'translate-x-5' : 'translate-x-0'
                                                } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                                        >
                                            <span
                                                className={`${settings.notifications ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
                                                    } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                            >
                                                <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                                    <path
                                                        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                            <span
                                                className={`${settings.notifications ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
                                                    } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                                            >
                                                <svg className="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 12 12">
                                                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                                </svg>
                                            </span>
                                        </span>
                                    </button>
                                    <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                                        {settings.notifications ? 'Açık' : 'Kapalı'}
                                    </span>
                                </div>
                            </dd>
                        </div>

                        {/* Dil Ayarı */}
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Dil
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                <select
                                    value={settings.language}
                                    onChange={(e) => handleLanguageChange(e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="tr">Türkçe</option>
                                    <option value="en">English</option>
                                </select>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Settings; 