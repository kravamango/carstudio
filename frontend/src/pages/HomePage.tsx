import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Car {
    id: string;
    title: string;
    price: number;
    year: number;
    mileage: number;
    brand: string;
}

export default function HomePage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [filters, setFilters] = useState({
        brand: '',
        minPrice: '',
        maxPrice: '',
        minYear: '',
        maxYear: '',
        search: ''
    });

    const fetchCars = async () => {
        const params = new URLSearchParams();
        if (filters.brand) params.append('brand', filters.brand);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.minYear) params.append('minYear', filters.minYear);
        if (filters.maxYear) params.append('maxYear', filters.maxYear);
        if (filters.search) params.append('search', filters.search);

        const res = await api.get(`/cars?${params.toString()}`);
        setCars(res.data);
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Автомобили</h1>

            <div className="bg-white border rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Поиск..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        className="border rounded px-4 py-2"
                    />
                    <input
                        type="text"
                        placeholder="Марка"
                        value={filters.brand}
                        onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                        className="border rounded px-4 py-2"
                    />
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Цена от"
                            value={filters.minPrice}
                            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                            className="border rounded px-4 py-2 w-full"
                        />
                        <input
                            type="number"
                            placeholder="до"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                            className="border rounded px-4 py-2 w-full"
                        />
                    </div>
                </div>
                <button
                    onClick={fetchCars}
                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                    Применить фильтры
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <Link
                        to={`/cars/${car.id}`}
                        key={car.id}
                        className="border rounded-lg p-4 hover:shadow-lg transition bg-white"
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