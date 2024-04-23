import React from "react";
import { ReactComponent as BatLogo } from "../svg/batModernAlt.svg";
import "../styles/Loader.scss";

export default function Loader({ modifier, borders }) {
  return (
    <div className={`loaderContainer --${modifier}`}>
      <div className="circles">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
      </div>

      <div className={`loader --${borders}`}>
        <div className={`loaderInside --${borders}`}></div>
      </div>
      <BatLogo className="loaderLogo" />
    </div>
  );
}
