import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Car {
    id: string;
    title: string;
    price: number;
    year: number;
    status: string;
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
            <h1 className="text-3xl font-bold mb-6">Мои объявления</h1>
            {cars.length === 0 ? (
                <p>У вас пока нет объявлений</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {cars.map((car) => (
                        <div key={car.id} className="border rounded-lg p-4 bg-white flex justify-between items-center">
                            <div>
                                <Link to={`/cars/${car.id}`} className="text-xl font-semibold hover:text-blue-500">
                                    {car.title}
                                </Link>
                                <p className="text-gray-600">{car.year} год • {car.price} €</p>
                                <p className="text-sm text-gray-500">Статус: {car.status}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(car.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Удалить
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}