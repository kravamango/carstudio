import { useEffect, useState } from 'react';
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
        <div>
            <h1>Автомобили</h1>
            <div>
                {cars.map((car) => (
                    <div key={car.id}>
                        <h3>{car.title}</h3>
                        <p>Год: {car.year}</p>
                        <p>Пробег: {car.mileage} км</p>
                        <p>Цена: {car.price} €</p>
                    </div>
                ))}
            </div>
        </div>
    );
}