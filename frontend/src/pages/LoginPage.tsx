import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (error) {
            alert('Ошибка входа');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6">
            <h1 className="text-3xl font-bold mb-6">Вход</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded px-4 py-2"
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded px-4 py-2"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Войти
                </button>
            </form>
        </div>
    );
}