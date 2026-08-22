import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

export default function EditCarPage() {
    const { id } = useParams();
    const navigate = useNavigate();
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
        color: '',
        photos: [] as string[]
    });

    useEffect(() => {
        api.get(`/cars/${id}`).then((res) => {
            const car = res.data;
            setForm({
                title: car.title,
                description: car.description,
                brand: car.brand,
                model: car.model,
                year: car.year,
                mileage: car.mileage,
                price: car.price,
                fuelType: car.fuelType,
                transmission: car.transmission,
                color: car.color,
                photos: car.photos || []
            });
        });
    }, [id]);

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('photo', file);

        try {
            const res = await api.post('/upload', formData);
            setForm({ ...form, photos: [...form.photos, res.data.url] });
        } catch (error) {
            alert('Ошибка загрузки фото');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await api.put(`/cars/${id}`, form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate(`/cars/${id}`);
        } catch (error) {
            alert('Ошибка обновления объявления');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6">
            <h1 className="text-3xl font-bold mb-6">Редактировать объявление</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="border rounded px-4 py-2"
                />
                <textarea
                    placeholder="Описание"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="border rounded px-4 py-2"
                    rows={4}
                />
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Марка"
                        value={form.brand}
                        onChange={(e) => setForm({ ...form, brand: e.target.value })}
                        className="border rounded px-4 py-2"
                    />
                    <input
                        type="text"
                        placeholder="Модель"
                        value={form.model}
                        onChange={(e) => setForm({ ...form, model: e.target.value })}
                        className="border rounded px-4 py-2"
                    />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <input
                        type="number"
                        placeholder="Год"
                        value={form.year}
                        onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                        className="border rounded px-4 py-2"
                    />
                    <input
                        type="number"
                        placeholder="Пробег"
                        value={form.mileage}
                        onChange={(e) => setForm({ ...form, mileage: Number(e.target.value) })}
                        className="border rounded px-4 py-2"
                    />
                    <input
                        type="number"
                        placeholder="Цена"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                        className="border rounded px-4 py-2"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <select
                        value={form.fuelType}
                        onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
                        className="border rounded px-4 py-2"
                    >
                        <option value="petrol">Бензин</option>
                        <option value="diesel">Дизель</option>
                        <option value="electric">Электро</option>
                        <option value="hybrid">Гибрид</option>
                    </select>
                    <select
                        value={form.transmission}
                        onChange={(e) => setForm({ ...form, transmission: e.target.value })}
                        className="border rounded px-4 py-2"
                    >
                        <option value="manual">Механика</option>
                        <option value="automatic">Автомат</option>
                    </select>
                </div>
                <input
                    type="text"
                    placeholder="Цвет"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="border rounded px-4 py-2"
                />
                <div>
                    <label className="block mb-2">Фото</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="border rounded px-4 py-2"
                    />
                    {form.photos.length > 0 && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {form.photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:5001${photo}`}
                                    alt=""
                                    className="w-20 h-20 object-cover rounded"
                                />
                            ))}
                        </div>
                    )}
                </div>
                <button type="submit" className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600">
                    Сохранить изменения
                </button>
            </form>
        </div>
    );
}