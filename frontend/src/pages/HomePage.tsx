import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import carsData from '../../data/cars.json';

interface Car {
    id: string;
    title: string;
    price: number;
    year: number;
    mileage: number;
    brand: string;
    model: string;
    photos: string[];
}

export default function HomePage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    const brandData = carsData.find((c: any) => c.brand === selectedBrand);

    const fetchCars = async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (selectedBrand) params.append('brand', selectedBrand);
        if (selectedModel) params.append('model', selectedModel);
        params.append('page', String(page));
        params.append('limit', '9');

        const res = await api.get(`/cars?${params.toString()}`);
        setCars(res.data.cars);
        setTotalPages(res.data.totalPages);
        setLoading(false);
    };

    useEffect(() => {
        fetchCars();
    }, [page]);

    return (
        <div>
            {/* Поиск */}
            <div className="bg-white border-b border-slate-200 py-8">
                <div className="max-w-5xl mx-auto px-6">
                    <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                        Продажа автомобилей
                    </h1>
                    <div className="flex flex-col md:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Поиск по объявлениям..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (setPage(1), fetchCars())}
                            className="flex-1 border-2 border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                        />
                        <select
                            value={selectedBrand}
                            onChange={(e) => { setSelectedBrand(e.target.value); setSelectedModel(''); }}
                            className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 bg-white"
                        >
                            <option value="">Все марки</option>
                            {carsData.map((car: any) => (
                                <option key={car.brand} value={car.brand}>{car.brand}</option>
                            ))}
                        </select>
                        <select
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                            disabled={!selectedBrand}
                            className="border-2 border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 bg-white disabled:opacity-50"
                        >
                            <option value="">Все модели</option>
                            {brandData?.models.map((m: any) => (
                                <option key={m.name} value={m.name}>{m.name}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => { setPage(1); fetchCars(); }}
                            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-medium"
                        >
                            Найти
                        </button>
                    </div>
                </div>
            </div>

            {/* Список */}
            <div className="max-w-7xl mx-auto p-6">
                <h2 className="text-lg font-semibold text-slate-700 mb-4">
                    {loading ? 'Загрузка...' : `Найдено объявлений: ${cars.length}`}
                </h2>

                {loading ? (
                    <div className="text-center py-20 text-slate-500">Загрузка...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {cars.map((car) => (
                            <Link
                                to={`/cars/${car.id}`}
                                key={car.id}
                                className="bg-white rounded-xl overflow-hidden hover:shadow-md transition border border-slate-100"
                            >
                                {car.photos && car.photos.length > 0 ? (
                                    <img
                                        src={`http://localhost:5001${car.photos[0]}`}
                                        alt={car.title}
                                        className="w-full h-52 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-52 bg-slate-100 flex items-center justify-center text-6xl">
                                        🚗
                                    </div>
                                )}
                                <div className="p-5">
                                    <h3 className="font-semibold text-lg text-slate-900 truncate">
                                        {car.brand} {car.model}
                                    </h3>
                                    <div className="flex gap-2 text-sm text-slate-500 mt-2">
                                        <span>{car.year}</span>
                                        <span>•</span>
                                        <span>{car.mileage.toLocaleString()} км</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900 mt-3">
                                        {car.price.toLocaleString()} €
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="px-5 py-2 bg-white border rounded-lg hover:bg-slate-50 disabled:opacity-50"
                        >
                            ←
                        </button>
                        <span className="px-5 py-2 bg-red-600 text-white rounded-lg font-medium">
              {page} / {totalPages}
            </span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="px-5 py-2 bg-white border rounded-lg hover:bg-slate-50 disabled:opacity-50"
                        >
                            →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}