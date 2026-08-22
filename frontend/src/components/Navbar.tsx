import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">CarStudio</Link>
            <div className="flex gap-4 items-center">
                {token ? (
                    <>
                        <Link to="/create-car" className="hover:text-gray-300">Создать объявление</Link>
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                            Выйти
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-gray-300">Войти</Link>
                        <Link to="/register" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                            Регистрация
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}