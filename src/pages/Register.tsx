import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { register } from '../store/slices/authSlice';

// Form validation schema
const schema = yup.object().shape({
    name: yup
        .string()
        .required('Ad Soyad zorunludur')
        .min(3, 'Ad Soyad en az 3 karakter olmalıdır'),
    email: yup
        .string()
        .required('E-posta adresi zorunludur')
        .email('Geçerli bir e-posta adresi giriniz'),
    password: yup
        .string()
        .required('Şifre zorunludur')
        .min(6, 'Şifre en az 6 karakter olmalıdır'),
    confirmPassword: yup
        .string()
        .required('Şifre tekrarı zorunludur')
        .oneOf([yup.ref('password')], 'Şifreler eşleşmiyor')
});

type FormInputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register: registerField,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<FormInputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: FormInputs) => {
        try {
            // Önce mevcut kullanıcıları kontrol et
            const existingUsers = localStorage.getItem('users');
            let users = existingUsers ? JSON.parse(existingUsers) : [];

            // E-posta adresi zaten kayıtlı mı kontrol et
            if (users.some((user: any) => user.email === data.email.trim())) {
                setError('email', {
                    type: 'manual',
                    message: 'Bu e-posta adresi zaten kayıtlı.'
                });
                return;
            }

            const userData = {
                id: Date.now().toString(),
                name: data.name.trim(),
                email: data.email.trim(),
                password: data.password
            };

            // Yeni kullanıcıyı ekle
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));

            // Aktif kullanıcıyı kaydet
            localStorage.setItem('user', JSON.stringify(userData));

            // Redux store'u güncelle
            dispatch(register({
                user: userData,
                token: 'mock-token'
            }));

            navigate('/dashboard');
        } catch (err: any) {
            console.error('Register error:', err);
            setError('root', {
                type: 'manual',
                message: 'Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Yeni hesap oluşturun
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Veya{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                            mevcut hesabınıza giriş yapın
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {errors.root && (
                        <div className="rounded-md bg-red-50 dark:bg-red-900 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                                        {errors.root.message}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Ad Soyad
                            </label>
                            <input
                                id="name"
                                {...registerField('name')}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                                placeholder="Ad Soyad"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                E-posta adresi
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...registerField('email')}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                                placeholder="E-posta adresi"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Şifre
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...registerField('password')}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                                placeholder="Şifre"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">
                                Şifre Tekrar
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                {...registerField('confirmPassword')}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                                placeholder="Şifre Tekrar"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Kayıt Ol
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register; 