import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ReactComponent as GithubIcon } from "../svg/github.svg";
import { IntroContext } from "../contexts/IntroContext";
import "../styles/Footer.scss";

export default function Footer() {
  const location = useLocation();
  const { intro, introRefreshStorage, disableIntroStorage } =
    useContext(IntroContext);
  return (
    <footer
      className={`footer ${disableIntroStorage && "--on"} ${
        !disableIntroStorage && !intro && "--off"
      } ${(location.pathname !== "/" || !introRefreshStorage) && "--enable"}`}
    >
      <div className="footer__socialIconsContainer">
        <a
          href="https://github.com/PioKl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon className="footer__icon" />
        </a>
      </div>
    </footer>
  );
}
