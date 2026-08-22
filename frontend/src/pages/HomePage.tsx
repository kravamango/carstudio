import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Car {
    id: string;
    title: string;
    price: number;
    year: number;
    mileage: number;
}

export default function HomePage() {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        api.get('/cars').then((res) => setCars(res.data));
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Автомобили</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <Link
                        to={`/cars/${car.id}`}
                        key={car.id}
                        className="border rounded-lg p-4 hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-semibold mb-2">{car.title}</h3>
                        <p className="text-gray-600">Год: {car.year}</p>
                        <p className="text-gray-600">Пробег: {car.mileage} км</p>
                        <p className="text-2xl font-bold text-green-600 mt-2">{car.price} €</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}