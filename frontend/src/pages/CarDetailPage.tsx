import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

interface Car {
    id: string;
    title: string;
    description: string;
    brand: string;
    model: string;
    year: number;
    mileage: number;
    price: number;
    fuelType: string;
    transmission: string;
    color: string;
    photos: string[];
    user: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
}

export default function CarDetailPage() {
    const { id } = useParams();
    const [car, setCar] = useState<Car | null>(null);

    useEffect(() => {
        api.get(`/cars/${id}`).then((res) => setCar(res.data));
    }, [id]);

    if (!car) return <div className="text-center py-20 text-slate-500">Загрузка...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">{car.title}</h1>

            {car.photos && car.photos.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {car.photos.map((photo, index) => (
                        <img
                            key={index}
                            src={`http://localhost:5001${photo}`}
                            alt=""
                            className="w-full h-64 object-cover rounded-xl"
                        />
                    ))}
                </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h2 className="font-semibold text-lg mb-4">Характеристики</h2>
                        <div className="space-y-2">
                            <p><span className="text-slate-500">Марка:</span> {car.brand}</p>
                            <p><span className="text-slate-500">Модель:</span> {car.model}</p>
                            <p><span className="text-slate-500">Год:</span> {car.year}</p>
                            <p><span className="text-slate-500">Пробег:</span> {car.mileage.toLocaleString()} км</p>
                            <p><span className="text-slate-500">Топливо:</span> {car.fuelType}</p>
                            <p><span className="text-slate-500">Коробка:</span> {car.transmission}</p>
                            <p><span className="text-slate-500">Цвет:</span> {car.color}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg mb-4">Цена</h2>
                        <p className="text-4xl font-bold text-red-600 mb-6">{car.price.toLocaleString()} €</p>
                        <h2 className="font-semibold text-lg mb-2">Описание</h2>
                        <p className="text-slate-600">{car.description}</p>
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100">
                    <h2 className="font-semibold text-lg mb-4">Продавец</h2>
                    <p className="text-slate-900">{car.user.firstName} {car.user.lastName}</p>
                    <p className="text-slate-500">{car.user.email}</p>
                    {car.user.phone && <p className="text-slate-500">{car.user.phone}</p>}
                </div>
            </div>
        </div>
    );
}