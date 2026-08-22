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
    };
}

export default function CarDetailPage() {
    const { id } = useParams();
    const [car, setCar] = useState<Car | null>(null);

    useEffect(() => {
        api.get(`/cars/${id}`).then((res) => setCar(res.data));
    }, [id]);

    if (!car) return <div className="text-center mt-20">Загрузка...</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            <h1 className="text-4xl font-bold mb-4">{car.title}</h1>

            {car.photos && car.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {car.photos.map((photo, index) => (
                        <img key={index} src={`http://localhost:5001${photo}`} alt="" className="w-full h-48 object-cover rounded" />
                    ))}
                </div>
            )}

            <div className="bg-white border rounded-lg p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Характеристики</h2>
                        <p className="mb-2"><span className="font-semibold">Марка:</span> {car.brand}</p>
                        <p className="mb-2"><span className="font-semibold">Модель:</span> {car.model}</p>
                        <p className="mb-2"><span className="font-semibold">Год:</span> {car.year}</p>
                        <p className="mb-2"><span className="font-semibold">Пробег:</span> {car.mileage} км</p>
                        <p className="mb-2"><span className="font-semibold">Топливо:</span> {car.fuelType}</p>
                        <p className="mb-2"><span className="font-semibold">Коробка:</span> {car.transmission}</p>
                        <p className="mb-2"><span className="font-semibold">Цвет:</span> {car.color}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Цена</h2>
                        <p className="text-4xl font-bold text-green-600 mb-6">{car.price} €</p>
                        <h2 className="text-xl font-semibold mb-4">Описание</h2>
                        <p className="text-gray-700">{car.description}</p>
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t">
                    <h2 className="text-xl font-semibold mb-4">Продавец</h2>
                    <p className="mb-2">{car.user.firstName} {car.user.lastName}</p>
                    <p className="text-gray-600">{car.user.email}</p>
                </div>
            </div>
        </div>
    );
}