import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (error) {
            setError('Неверный email или пароль');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md border border-slate-100">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Вход</h1>
                <p className="text-slate-500 mb-6">Войдите в свой аккаунт</p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                    />
                    <button
                        type="submit"
                        className="bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium"
                    >
                        Войти
                    </button>
                </form>

                <p className="text-center mt-6 text-slate-500 text-sm">
                    Нет аккаунта?{' '}
                    <Link to="/register" className="text-red-600 hover:underline font-medium">
                        Зарегистрироваться
                    </Link>
                </p>
            </div>
        </div>
    );
}