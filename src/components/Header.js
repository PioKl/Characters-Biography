import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Header.scss";
import { IntroContext } from "../contexts/IntroContext";

export default function Header() {
  const location = useLocation();
  const {
    intro,
    setIntro,
    introRefreshStorage,
    disableIntroStorage,
    setDisableIntroStorage,
    setIntroRefreshStorage,
  } = useContext(IntroContext);

  const [disableIntro, setDisableIntro] = useState(
    localStorage.getItem("disableIntro") === "true"
  );

  const handleToggleDisableIntro = () => {
    setIntro(true);

    const newValue = !disableIntro;

    // Aktualizacja stan komponentu
    setDisableIntro(newValue);
  };

  //z powodu asynchroniczności localStorage
  useEffect(() => {
    // Ustawienie wartości w localStorage
    localStorage.setItem("disableIntro", disableIntro);

    // Aktualizacja wartości dla stanu
    setDisableIntroStorage(disableIntro);

    //W przypadku gdy podany adres strony nie istnieje
    if (window.location.pathname !== `${process.env.PUBLIC_URL}`) {
      localStorage.setItem("introRefresh", "false");
      setIntroRefreshStorage(false);
    }
  }, [disableIntro, setDisableIntroStorage, setIntroRefreshStorage]);

  return (
    <header
      className={`header ${disableIntroStorage && "--on"} ${
        !disableIntroStorage && !intro && "--off"
      } ${(location.pathname !== "/" || !introRefreshStorage) && "--enable"}`}
    >
      <nav className="nav">
        <Link
          className="nav__itemLink"
          to={{
            pathname: `/`,
          }}
          tabIndex="0"
        >
          <button className="nav__item" type="button">
            Home
          </button>
        </Link>
        <label className="nav__toggleIntroLabel">
          <input
            className="nav__toggleIntroInput"
            type="checkbox"
            checked={disableIntro}
            onChange={handleToggleDisableIntro}
          />
          <span className="nav__toggleIntroSlider"></span>
          <span className="nav__toggleIntroIcon --on"></span>
          <span className="nav__toggleIntroIcon --off"></span>
          <span className="nav__toggleIntroName">Intro</span>
        </label>
      </nav>
    </header>
  );
}
