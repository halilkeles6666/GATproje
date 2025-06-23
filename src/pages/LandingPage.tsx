import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const LandingPage: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
                            Görev Yönetimi Sistemi
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                            Görevlerinizi organize edin, takip edin ve başarıya ulaşın.
                        </p>
                        <div className="space-x-4">
                            <Link
                                to="/login"
                                className="inline-block px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-primary-600 transition-colors duration-200"
                            >
                                Giriş Yap
                            </Link>
                            <Link
                                to="/register"
                                className="inline-block px-8 py-3 bg-white text-primary-600 font-medium rounded-md hover:bg-gray-100 transition-colors duration-200"
                            >
                                Kayıt Ol
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Özellikler */}
            <div className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                        Özellikler
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <div className="text-4xl mb-4">📋</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Görev Yönetimi</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Görevlerinizi oluşturun, düzenleyin ve takip edin. Önceliklerinizi belirleyin.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">İstatistikler</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Görevlerinizin durumunu ve ilerlemenizi görsel grafiklerle takip edin.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Hedef Takibi</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Hedeflerinizi belirleyin ve ilerlemenizi takip edin.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Hemen Başlayın</h2>
                    <p className="text-xl mb-8">
                        Ücretsiz hesap oluşturun ve görevlerinizi yönetmeye başlayın.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block px-8 py-3 bg-white text-primary-600 font-medium rounded-md hover:bg-gray-100 transition-colors duration-200"
                    >
                        Ücretsiz Kayıt Ol
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage; 