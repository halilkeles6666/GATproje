import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../store/slices/authSlice';

// Form validation schema
const schema = yup.object().shape({
    email: yup
        .string()
        .required('E-posta adresi zorunludur')
        .email('Geçerli bir e-posta adresi giriniz'),
    password: yup
        .string()
        .required('Şifre zorunludur')
});

type FormInputs = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<FormInputs>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: FormInputs) => {
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Önce e-posta kontrolü
            const user = users.find((u: any) => u.email === data.email);

            if (!user) {
                setError('email', {
                    type: 'manual',
                    message: 'Bu e-posta adresi ile kayıtlı bir hesap bulunamadı.'
                });
                return;
            }

            // Sonra şifre kontrolü
            if (user.password !== data.password) {
                setError('password', {
                    type: 'manual',
                    message: 'Şifre hatalı.'
                });
                return;
            }

            localStorage.setItem('user', JSON.stringify(user));
            dispatch(login({
                user,
                token: 'mock-token'
            }));

            navigate('/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);
            setError('root', {
                type: 'manual',
                message: 'Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Hesabınıza giriş yapın
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Veya{' '}
                        <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                            yeni hesap oluşturun
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
                            <label htmlFor="email" className="sr-only">
                                E-posta adresi
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email')}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
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
                                {...register('password')}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm dark:bg-gray-700"
                                placeholder="Şifre"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Giriş Yap
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login; 