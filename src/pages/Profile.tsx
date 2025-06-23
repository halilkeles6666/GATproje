import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateUser } from '../store/slices/authSlice';
import { useTheme } from '../context/ThemeContext';
import { toggleNotifications } from '../store/slices/settingsSlice';
import { Task } from '../store/slices/tasksSlice';

const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const { theme, toggleTheme } = useTheme();
    const user = useSelector((state: RootState) => state.auth.user);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name.trim() || !email.trim()) {
            setError('Ad Soyad ve E-posta alanları zorunludur.');
            return;
        }

        try {
            // Kullanıcı listesini güncelle
            const users = localStorage.getItem('users');
            if (users) {
                const userList = JSON.parse(users);
                const updatedUserList = userList.map((u: any) => {
                    if (u.id === user?.id) {
                        return { ...u, name: name.trim(), email: email.trim() };
                    }
                    return u;
                });
                localStorage.setItem('users', JSON.stringify(updatedUserList));
            }

            // Aktif kullanıcıyı güncelle
            const updatedUser = {
                ...user,
                name: name.trim(),
                email: email.trim()
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            dispatch(updateUser({ name: name.trim(), email: email.trim() }));
            setSuccess('Profil bilgileri güncellendi.');
        } catch (err) {
            console.error('Profile update error:', err);
            setError('Profil güncellenirken bir hata oluştu.');
        }
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setPasswordSuccess('');

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Tüm şifre alanları zorunludur.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Yeni şifreler eşleşmiyor.');
            return;
        }

        try {
            // Kullanıcı listesini güncelle
            const users = localStorage.getItem('users');
            const storedUser = localStorage.getItem('user');

            if (!users || !storedUser) {
                setError('Kullanıcı bilgileri bulunamadı.');
                return;
            }

            const userList = JSON.parse(users);
            const userData = JSON.parse(storedUser);

            if (currentPassword !== userData.password) {
                setError('Mevcut şifre yanlış.');
                return;
            }

            // Users listesini güncelle
            const updatedUserList = userList.map((u: any) => {
                if (u.id === userData.id) {
                    return { ...u, password: newPassword };
                }
                return u;
            });
            localStorage.setItem('users', JSON.stringify(updatedUserList));

            // Aktif kullanıcıyı güncelle
            const updatedUser = {
                ...userData,
                password: newPassword
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            // Redux store'u güncelle
            dispatch(updateUser({
                name: userData.name,
                email: userData.email,
                password: newPassword
            }));

            setPasswordSuccess('Şifre başarıyla güncellendi.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            console.error('Password change error:', err);
            setError('Şifre güncellenirken bir hata oluştu.');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Profil Ayarları</h1>

                {error && (
                    <div className="mb-4 rounded-md bg-red-50 dark:bg-red-900 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{error}</h3>
                            </div>
                        </div>
                    </div>
                )}

                {success && (
                    <div className="mb-4 rounded-md bg-green-50 dark:bg-green-900 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">{success}</h3>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profil Bilgileri</h2>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Ad Soyad
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    E-posta
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    Güncelle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Şifre Değiştir</h2>
                        {error && (
                            <div className="mb-4 rounded-md bg-red-50 dark:bg-red-900 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">{error}</h3>
                                    </div>
                                </div>
                            </div>
                        )}

                        {passwordSuccess && (
                            <div className="mb-4 rounded-md bg-green-50 dark:bg-green-900 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-green-800 dark:text-green-200">{passwordSuccess}</h3>
                                    </div>
                                </div>
                            </div>
                        )}
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Mevcut Şifre
                                </label>
                                <input
                                    type="password"
                                    id="current-password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Yeni Şifre
                                </label>
                                <input
                                    type="password"
                                    id="new-password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Yeni Şifre Tekrar
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    Şifre Değiştir
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Görünüm</h2>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700 dark:text-gray-300">Karanlık Mod</span>
                            <button
                                onClick={toggleTheme}
                                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 bg-gray-200 dark:bg-primary-600"
                            >
                                <span
                                    className={`${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 