import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import carsData from '../../data/cars.json';

export default function EditCarPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        description: '',
        brand: '',
        model: '',
        generation: '',
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
                generation: car.generation || '',
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

    const selectedBrand = carsData.find((c: any) => c.brand === form.brand);
    const selectedModel = selectedBrand?.models?.find((m: any) => m.name === form.model);
    const selectedGeneration = selectedModel?.generations?.find((g: any) => g.gen === form.generation);

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
            alert('Ошибка обновления');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6">
            <h1 className="text-3xl font-bold mb-6">Редактировать объявление</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm text-slate-500 mb-1">Марка</label>
                        <select
                            value={form.brand}
                            onChange={(e) => setForm({ ...form, brand: e.target.value, model: '', generation: '' })}
                            className="border rounded px-4 py-2 w-full"
                        >
                            <option value="">Выберите</option>
                            {carsData.map((car: any) => (
                                <option key={car.brand} value={car.brand}>{car.brand}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-500 mb-1">Модель</label>
                        <select
                            value={form.model}
                            onChange={(e) => setForm({ ...form, model: e.target.value, generation: '' })}
                            className="border rounded px-4 py-2 w-full"
                            disabled={!form.brand}
                        >
                            <option value="">Выберите</option>
                            {selectedBrand?.models?.map((m: any) => (
                                <option key={m.name} value={m.name}>{m.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-500 mb-1">Поколение</label>
                        <select
                            value={form.generation}
                            onChange={(e) => setForm({ ...form, generation: e.target.value })}
                            className="border rounded px-4 py-2 w-full"
                            disabled={!form.model}
                        >
                            <option value="">Выберите</option>
                            {selectedModel?.generations?.map((g: any) => (
                                <option key={g.gen} value={g.gen}>{g.gen} ({g.years})</option>
                            ))}
                        </select>
                    </div>
                </div>

                {selectedGeneration?.photo && (
                    <div className="border rounded-lg overflow-hidden">
                        <img
                            src={selectedGeneration.photo}
                            alt={selectedGeneration.gen}
                            className="w-full h-64 object-cover"
                        />
                        <p className="text-center py-2 bg-slate-50 text-sm text-slate-600">
                            {form.brand} {form.model} {selectedGeneration.gen} ({selectedGeneration.years})
                        </p>
                    </div>
                )}

                <div>
                    <label className="block text-sm text-slate-500 mb-1">Заголовок</label>
                    <input
                        type="text"
                        placeholder="Заголовок"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="border rounded px-4 py-2 w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm text-slate-500 mb-1">Описание</label>
                    <textarea
                        placeholder="Описание"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="border rounded px-4 py-2 w-full"
                        rows={4}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm text-slate-500 mb-1">Год выпуска</label>
                        <select
                            value={form.year}
                            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                            className="border rounded px-4 py-2 w-full"
                        >
                            {Array.from({ length: 57 }, (_, i) => 2026 - i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-500 mb-1">Пробег, км</label>
                        <input
                            type="number"
                            placeholder="0"
                            value={form.mileage}
                            onChange={(e) => setForm({ ...form, mileage: Number(e.target.value) })}
                            className="border rounded px-4 py-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-500 mb-1">Цена, €</label>
                        <input
                            type="number"
                            placeholder="0"
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                            className="border rounded px-4 py-2 w-full"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm text-slate-500 mb-1">Топливо</label>
                        <select
                            value={form.fuelType}
                            onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
                            className="border rounded px-4 py-2 w-full"
                        >
                            <option value="petrol">Бензин</option>
                            <option value="diesel">Дизель</option>
                            <option value="electric">Электро</option>
                            <option value="hybrid">Гибрид</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-500 mb-1">Коробка</label>
                        <select
                            value={form.transmission}
                            onChange={(e) => setForm({ ...form, transmission: e.target.value })}
                            className="border rounded px-4 py-2 w-full"
                        >
                            <option value="manual">Механика</option>
                            <option value="automatic">Автомат</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-500 mb-1">Цвет</label>
                        <select
                            value={form.color}
                            onChange={(e) => setForm({ ...form, color: e.target.value })}
                            className="border rounded px-4 py-2 w-full"
                        >
                            <option value="">Выберите</option>
                            <option value="Белый">Белый</option>
                            <option value="Чёрный">Чёрный</option>
                            <option value="Серый">Серый</option>
                            <option value="Серебристый">Серебристый</option>
                            <option value="Красный">Красный</option>
                            <option value="Синий">Синий</option>
                            <option value="Зелёный">Зелёный</option>
                            <option value="Коричневый">Коричневый</option>
                            <option value="Бежевый">Бежевый</option>
                            <option value="Жёлтый">Жёлтый</option>
                            <option value="Оранжевый">Оранжевый</option>
                            <option value="Фиолетовый">Фиолетовый</option>
                            <option value="Голубой">Голубой</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-slate-500 mb-1">Фото автомобиля</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="border rounded px-4 py-2 w-full"
                    />
                    {form.photos.length > 0 && (
                        <div className="flex gap-2 mt-2">
                            {form.photos.map((photo, index) => (
                                <div key={index} className="relative">
                                    <img src={`http://localhost:5001${photo}`} alt="" className="w-20 h-20 object-cover rounded" />
                                    <button
                                        type="button"
                                        onClick={() => setForm({ ...form, photos: form.photos.filter((_, i) => i !== index) })}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button type="submit" className="bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium">
                    Сохранить изменения
                </button>
            </form>
        </div>
    );
}