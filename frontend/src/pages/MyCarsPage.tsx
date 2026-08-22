import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Car {
    id: string;
    title: string;
    price: number;
    year: number;
    status: string;
    photos: string[];
}

export default function MyCarsPage() {
    const [cars, setCars] = useState<Car[]>([]);

    const fetchCars = async () => {
        const token = localStorage.getItem('token');
        const res = await api.get('/cars/my', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setCars(res.data);
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Удалить объявление?')) return;
        const token = localStorage.getItem('token');
        await api.delete(`/cars/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchCars();
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Мои объявления</h1>
            {cars.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center text-slate-500">
                    У вас пока нет объявлений
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {cars.map((car) => (
                        <div key={car.id} className="bg-white rounded-xl border border-slate-100 p-4 flex justify-between items-center">
                            <div className="flex gap-4 items-center">
                                {car.photos && car.photos.length > 0 ? (
                                    <img
                                        src={`http://localhost:5001${car.photos[0]}`}
                                        alt=""
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-3xl">🚗</div>
                                )}
                                <div>
                                    <Link to={`/cars/${car.id}`} className="font-semibold text-lg hover:text-red-600">
                                        {car.title}
                                    </Link>
                                    <p className="text-slate-500">{car.year} год • {car.price.toLocaleString()} €</p>
                                    <p className="text-sm text-slate-400">Статус: {car.status}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    to={`/cars/${car.id}/edit`}
                                    className="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 text-sm"
                                >
                                    Редактировать
                                </Link>
                                <button
                                    onClick={() => handleDelete(car.id)}
                                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}