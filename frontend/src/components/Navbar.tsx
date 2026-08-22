import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav>
            <Link to="/">Главная</Link>
            {token ? (
                <>
                    <Link to="/create-car">Создать объявление</Link>
                    <button onClick={handleLogout}>Выйти</button>
                </>
            ) : (
                <>
                    <Link to="/login">Войти</Link>
                    <Link to="/register">Регистрация</Link>
                </>
            )}
        </nav>
    );
}