import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function RegisterPage() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', form);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (error) {
            alert('Ошибка регистрации');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6">
            <h1 className="text-3xl font-bold mb-6">Регистрация</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Имя"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="border rounded px-4 py-2"
                />
                <input
                    type="text"
                    placeholder="Фамилия"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="border rounded px-4 py-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border rounded px-4 py-2"
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="border rounded px-4 py-2"
                />
                <input
                    type="tel"
                    placeholder="Телефон"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="border rounded px-4 py-2"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
}