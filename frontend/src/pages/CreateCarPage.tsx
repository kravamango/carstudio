import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CreateCarPage() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        brand: '',
        model: '',
        year: 2020,
        mileage: 0,
        price: 0,
        fuelType: 'petrol',
        transmission: 'manual',
        color: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await api.post('/cars', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/');
        } catch (error) {
            alert('Ошибка создания объявления');
        }
    };

    return (
        <div>
            <h1>Создать объявление</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <textarea
                    placeholder="Описание"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Марка"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Модель"
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Год"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Пробег"
                    value={form.mileage}
                    onChange={(e) => setForm({ ...form, mileage: Number(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Цена"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
                <select
                    value={form.fuelType}
                    onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
                >
                    <option value="petrol">Бензин</option>
                    <option value="diesel">Дизель</option>
                    <option value="electric">Электро</option>
                    <option value="hybrid">Гибрид</option>
                </select>
                <select
                    value={form.transmission}
                    onChange={(e) => setForm({ ...form, transmission: e.target.value })}
                >
                    <option value="manual">Механика</option>
                    <option value="automatic">Автомат</option>
                </select>
                <input
                    type="text"
                    placeholder="Цвет"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                />
                <button type="submit">Создать</button>
            </form>
        </div>
    );
}