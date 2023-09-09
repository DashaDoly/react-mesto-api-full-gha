import { Link, useNavigate } from "react-router-dom";

export default function Header({ name, userEmail }) {
  const navigate = useNavigate();
  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in')
  }
  return (
    <header className="header page__header">
      <div className="header__container">
        <div className="header__logo" />
        <div className="header__info-container">
          {name === "main" && <p className="header__email">{userEmail}</p>}
          <Link to={name === "main" ? "/sign-in" : name === "signup" ? "/sign-in" : "/sign-up"} className="header__link" onClick={name === "main" && signOut}>{name === "main" ? "Выйти" : name === "signup" ? "Войти" : "Регистрация"}</Link>
        </div>
      </div>

    </header>
  )
}
