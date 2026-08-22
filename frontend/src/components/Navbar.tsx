import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    Car<span className="text-red-600">Studio</span>
                </Link>
                <div className="flex gap-2 items-center">
                    {token ? (
                        <>
                            <Link
                                to="/create-car"
                                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 transition text-white font-medium"
                            >
                                + Подать объявление
                            </Link>
                            <Link
                                to="/my-cars"
                                className="px-4 py-2.5 rounded-lg hover:bg-slate-100 transition text-slate-700"
                            >
                                Мои объявления
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2.5 rounded-lg hover:bg-slate-100 transition text-slate-500"
                            >
                                Выйти
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2.5 rounded-lg hover:bg-slate-100 transition text-slate-700"
                            >
                                Войти
                            </Link>
                            <Link
                                to="/register"
                                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 transition text-white font-medium"
                            >
                                Регистрация
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}