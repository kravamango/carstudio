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

    if (!car) return <div>Загрузка...</div>;

    return (
        <div>
            <h1>{car.title}</h1>
            <p>{car.description}</p>
            <p>Марка: {car.brand}</p>
            <p>Модель: {car.model}</p>
            <p>Год: {car.year}</p>
            <p>Пробег: {car.mileage} км</p>
            <p>Цена: {car.price} €</p>
            <p>Топливо: {car.fuelType}</p>
            <p>Коробка: {car.transmission}</p>
            <p>Цвет: {car.color}</p>
            <h3>Продавец</h3>
            <p>{car.user.firstName} {car.user.lastName}</p>
            <p>{car.user.email}</p>
        </div>
    );
}