import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function RegisterPage() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/auth/register', form);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (error) {
            setError('Ошибка регистрации');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md border border-slate-100">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Регистрация</h1>
                <p className="text-slate-500 mb-6">Присоединяйтесь к CarStudio</p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Имя"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className="border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                    />
                    <input
                        type="text"
                        placeholder="Фамилия"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className="border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                    />
                    <input
                        type="tel"
                        placeholder="Телефон"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                    />
                    <button
                        type="submit"
                        className="bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium"
                    >
                        Зарегистрироваться
                    </button>
                </form>

                <p className="text-center mt-6 text-slate-500 text-sm">
                    Уже есть аккаунт?{' '}
                    <Link to="/login" className="text-red-600 hover:underline font-medium">
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
}