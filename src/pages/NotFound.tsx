import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <h1 className="text-9xl font-extrabold text-primary-600 dark:text-primary-400">404</h1>
                <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Sayfa Bulunamadı</h2>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                    Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                    >
                        Ana Sayfaya Dön
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound; 