import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/CharacterBioCard.scss";
import Loader from "./Loader";
import { IntroContext } from "../contexts/IntroContext";

export default function CharacterBioCard({
  item,
  setBlockMainSite,
  handleHoverName,
}) {
  const { setFirstTimeLoadDataStorage } = useContext(IntroContext);
  const [imageLoaded, setImageLoaded] = useState(false); //Sprawdzenie, czy obrazek się w pełni załadował

  return (
    <>
      <Link
        to={{
          pathname: `/characters/${item.slug}`,
          state: { characterData: item },
        }}
        tabIndex="0"
        key={item.id}
        className="characterCard"
        onClick={() => {
          setBlockMainSite(true);
          localStorage.setItem("firstTimeLoadData", "false");
          setFirstTimeLoadDataStorage(false);
        }}
        onMouseEnter={() => handleHoverName(item.name)}
        onMouseLeave={() => handleHoverName(null)}
        onFocus={() => handleHoverName(item.name)}
      >
        <div className="imageContainer">
          <img
            className="image"
            src={item.images.sm}
            alt={`${item.name} img`}
            onLoad={() => {
              setImageLoaded(true);
            }}
          />

          {!imageLoaded && <Loader modifier={"centered"} borders={"remove"} />}

          <div className="imageOverlay">
            <h2 className="imageName">{item.name}</h2>
          </div>
        </div>
      </Link>
    </>
  );
}
