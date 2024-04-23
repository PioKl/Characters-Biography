import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ErrorPage from "../pages/ErrorPage";
import Loader from "./Loader";
import DynamicTextDisplay from "./WordGenerators/DynamicTextDisplay";
import resolution from "../styles/Resolutions.scss";
import { emToPixels } from "../utils/emToPixels";
import "../styles/CharacterDetails.scss";
import { IntroContext } from "../contexts/IntroContext";

export default function CharacterDetails({ setBlockMainSite }) {
  const { setIntro, setFirstTimeLoadDataStorage } = useContext(IntroContext);
  const { slug } = useParams();
  const location = useLocation();

  const [characterData, setCharacterData] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false); //Sprawdzenie, czy obrazek się w pełni załadował
  const [error, setError] = useState(false);

  const dynamicTextType = {
    span: "span",
    h1: "h1",
  };
  const tabletResolution = window.innerWidth >= emToPixels(resolution.bpTablet);

  useEffect(() => {
    // Sprawdza, czy aktualna ścieżka pasuje do wzoru /characters/:slug
    //Bezpośrednie zablokowanie gdy użytkownik "sztywno" wejdzie z linka na podstronę
    //location.pathname.startsWith("/characters/"); //Jeśli tak, ustaw blockMainSite na true
    if (location.pathname.startsWith("/characters/")) {
      //Jeśli tak, ustaw intro i blockMainSite na true oraz storage firstTimeLoadData na false
      setIntro(true);
      setBlockMainSite(true);
      localStorage.setItem("firstTimeLoadData", "false");
      setFirstTimeLoadDataStorage(false);
    }

    // Pobierz dane postaci z API
    fetch("https://akabab.github.io/superhero-api/api/all.json")
      .then((response) => response.json())
      .then((data) => {
        const foundCharacter = data.find(
          (character) => character.slug === slug
        );
        if (!foundCharacter) {
          setError(true); // Ustawienie stanu błędu na true, jeśli postać nie zostanie znaleziona
          return;
        }
        setCharacterData(foundCharacter);
      })
      .catch((error) => {
        console.error("Error fetching character data:", error);
        setError(true); // Ustawienie stanu błędu na true w przypadku błędu pobierania danych
      });
  }, [
    location.pathname,
    slug,
    setBlockMainSite,
    setIntro,
    setFirstTimeLoadDataStorage,
  ]);

  //Jeśli nie ma takiej postaci, wtedy zamiast tego wyświetli się wiadomość z błędem
  if (error) {
    return <ErrorPage />;
  }

  return (
    characterData && (
      <div className="characterDetails">
        <div className="characterDetails__areaOne">
          <h1>{characterData.name}</h1>
        </div>
        <div className="characterDetails__areaTwo">
          <div className="characterDetails__areaThree">
            <div className="characterDetails__imageContainer">
              <div className="characterDetails__imageOverlay"></div>
              <img
                className="characterDetails__image"
                src={characterData.images.md}
                alt={`${characterData.name}`}
                onLoad={() => {
                  setImageLoaded(true);
                }}
              />
              <span className="characterDetails__scan">Scanning</span>

              {!imageLoaded && (
                <Loader modifier={"centered"} borders={"remove"} />
              )}
            </div>

            <div
              className={`characterDetails__quickInfo ${
                characterData.biography.fullName.length > 15 && "--long"
              }`}
            >
              <span className="characterDetails__quickInfoTitle">Name:</span>
              <span className="characterDetails__quickInfoTitle">Sex:</span>

              <DynamicTextDisplay
                arrayOfText={[
                  `${
                    characterData.biography.fullName
                      ? characterData.biography.fullName
                      : characterData.name
                  }`,
                ]}
                intervalTime={40}
                delayTime={3000}
                className={"characterDetails__quickInfoDetail"}
                type={dynamicTextType.span}
                enableFastDisplay={true}
              />

              <DynamicTextDisplay
                arrayOfText={[`${characterData.appearance.gender}`]}
                intervalTime={40}
                delayTime={3000}
                className={"characterDetails__quickInfoDetail"}
                type={dynamicTextType.span}
                enableFastDisplay={true}
              />

              <span className="characterDetails__quickInfoTitle">Height:</span>
              <span className="characterDetails__quickInfoTitle">Weight:</span>

              <DynamicTextDisplay
                arrayOfText={[
                  `${
                    characterData.appearance.height[1] === "0 cm"
                      ? "Unknown"
                      : characterData.appearance.height[1]
                  }`,
                ]}
                intervalTime={40}
                delayTime={3000}
                className={"characterDetails__quickInfoDetail"}
                type={dynamicTextType.span}
                enableFastDisplay={true}
              />

              <DynamicTextDisplay
                arrayOfText={[
                  `${
                    characterData.appearance.weight[1] === "0 kg"
                      ? "Unknown"
                      : characterData.appearance.weight[1]
                  }`,
                ]}
                intervalTime={40}
                delayTime={3000}
                className={"characterDetails__quickInfoDetail"}
                type={dynamicTextType.span}
                enableFastDisplay={true}
              />
            </div>
            <div
              className={`characterDetails__quickInfoAlignment ${
                characterData.biography.alignment === "bad" && "--bad"
              }`}
            >
              <DynamicTextDisplay
                arrayOfText={[`${characterData.biography.alignment}`]}
                intervalTime={40}
                delayTime={3000}
                type={dynamicTextType.span}
                enableFastDisplay={true}
              />
            </div>
          </div>
          <div className="characterDetails__areaFour">
            <div className="characterDetails__infoContainer">
              <span>Name</span>
              {!tabletResolution ? (
                <span>
                  {characterData.biography.fullName
                    ? characterData.biography.fullName
                    : characterData.name}
                </span>
              ) : (
                <DynamicTextDisplay
                  arrayOfText={[
                    `${
                      characterData.biography.fullName
                        ? characterData.biography.fullName
                        : characterData.name
                    }`,
                  ]}
                  intervalTime={40}
                  delayTime={3000}
                  type={dynamicTextType.span}
                  enableFastDisplay={true}
                />
              )}

              <span>Sex</span>
              {!tabletResolution ? (
                <span>{characterData.appearance.gender}</span>
              ) : (
                <DynamicTextDisplay
                  arrayOfText={[`${characterData.appearance.gender}`]}
                  intervalTime={40}
                  delayTime={3000}
                  type={dynamicTextType.span}
                  enableFastDisplay={true}
                />
              )}
              <span>Eye Color</span>
              {!tabletResolution ? (
                <span>{characterData.appearance.eyeColor}</span>
              ) : (
                <DynamicTextDisplay
                  arrayOfText={[`${characterData.appearance.eyeColor}`]}
                  intervalTime={40}
                  delayTime={3000}
                  type={dynamicTextType.span}
                  enableFastDisplay={true}
                />
              )}
              <span>Hair Color</span>
              {!tabletResolution ? (
                <span>{characterData.appearance.hairColor}</span>
              ) : (
                <DynamicTextDisplay
                  arrayOfText={[`${characterData.appearance.hairColor}`]}
                  intervalTime={40}
                  delayTime={3000}
                  type={dynamicTextType.span}
                  enableFastDisplay={true}
                />
              )}
              <span>Race</span>
              {!tabletResolution ? (
                <span>{characterData.appearance.race}</span>
              ) : (
                <DynamicTextDisplay
                  arrayOfText={[`${characterData.appearance.race}`]}
                  intervalTime={40}
                  delayTime={3000}
                  type={dynamicTextType.span}
                  enableFastDisplay={true}
                />
              )}
              <span>Place of Birth</span>
              {!tabletResolution ? (
                <span>{characterData.biography.placeOfBirth}</span>
              ) : (
                <DynamicTextDisplay
                  arrayOfText={[`${characterData.biography.placeOfBirth}`]}
                  intervalTime={40}
                  delayTime={3000}
                  type={dynamicTextType.span}
                  enableFastDisplay={true}
                />
              )}
              <span>Group Affiliation</span>
              {!tabletResolution ? (
                <span>{characterData.connections.groupAffiliation}</span>
              ) : (
                <DynamicTextDisplay
                  arrayOfText={[
                    `${characterData.connections.groupAffiliation}`,
                  ]}
                  intervalTime={40}
                  delayTime={3000}
                  type={dynamicTextType.span}
                  enableFastDisplay={true}
                />
              )}
              <span>Relatives</span>
              {!tabletResolution ? (
                <span>{characterData.connections.relatives}</span>
              ) : (
                <DynamicTextDisplay
                  arrayOfText={[`${characterData.connections.relatives}`]}
                  intervalTime={40}
                  delayTime={3000}
                  type={dynamicTextType.span}
                  enableFastDisplay={true}
                />
              )}
              <span>Alter Egos</span>
              {!tabletResolution ? (
                <span>{characterData.biography.alterEgos}</span>
              ) : (
                <DynamicTextDisplay
                  arrayOfText={[`${characterData.biography.alterEgos}`]}
                  intervalTime={40}
                  delayTime={3000}
                  type={dynamicTextType.span}
                  enableFastDisplay={true}
                />
              )}
              <span>Base</span>
              {!tabletResolution ? (
                <span>{characterData.work.base}</span>
              ) : (
                <DynamicTextDisplay
                  arrayOfText={[`${characterData.work.base}`]}
                  intervalTime={40}
                  delayTime={3000}
                  type={dynamicTextType.span}
                  enableFastDisplay={true}
                />
              )}
              <span>Occupation</span>
              {!tabletResolution ? (
                <span>{characterData.work.occupation}</span>
              ) : (
                <DynamicTextDisplay
                  arrayOfText={[`${characterData.work.occupation}`]}
                  intervalTime={40}
                  delayTime={3000}
                  type={dynamicTextType.span}
                  enableFastDisplay={true}
                />
              )}
            </div>
            <div className="characterDetails__breakLine">
              <span className="characterDetails__breakLineOne"></span>
              <span className="characterDetails__breakLineTwo"></span>
              <span className="characterDetails__breakLineThree"></span>
            </div>
            <div className="characterDetails__powerStatsContainer">
              <ul className="characterDetails__powerStatsList">
                <li className="characterDetails__powerStatsListItem">
                  <span className="characterDetails__powerStatName">
                    Combat:
                  </span>
                  {!tabletResolution ? (
                    <span className="characterDetails__powerStatQuantity">
                      {characterData.powerstats.combat}
                    </span>
                  ) : (
                    <DynamicTextDisplay
                      arrayOfText={[`${characterData.powerstats.combat}`]}
                      intervalTime={40}
                      delayTime={3000}
                      className={"characterDetails__powerStatQuantity"}
                      type={dynamicTextType.span}
                      enableFastDisplay={true}
                    />
                  )}
                </li>
                <li className="characterDetails__powerStatsListItem">
                  <span className="characterDetails__powerStatName">
                    Durability:
                  </span>
                  {!tabletResolution ? (
                    <span className="characterDetails__powerStatQuantity">
                      {characterData.powerstats.durability}
                    </span>
                  ) : (
                    <DynamicTextDisplay
                      arrayOfText={[`${characterData.powerstats.durability}`]}
                      intervalTime={40}
                      delayTime={3000}
                      className={"characterDetails__powerStatQuantity"}
                      type={dynamicTextType.span}
                      enableFastDisplay={true}
                    />
                  )}
                </li>
                <li className="characterDetails__powerStatsListItem">
                  <span className="characterDetails__powerStatName">
                    Intelligence:
                  </span>
                  {!tabletResolution ? (
                    <span className="characterDetails__powerStatQuantity">
                      {characterData.powerstats.intelligence}
                    </span>
                  ) : (
                    <DynamicTextDisplay
                      arrayOfText={[`${characterData.powerstats.intelligence}`]}
                      intervalTime={40}
                      delayTime={3000}
                      className={"characterDetails__powerStatQuantity"}
                      type={dynamicTextType.span}
                      enableFastDisplay={true}
                    />
                  )}
                </li>
              </ul>
              <ul className="characterDetails__powerStatsList">
                <li className="characterDetails__powerStatsListItem">
                  <span className="characterDetails__powerStatName">
                    Power:
                  </span>
                  {!tabletResolution ? (
                    <span className="characterDetails__powerStatQuantity">
                      {characterData.powerstats.power}
                    </span>
                  ) : (
                    <DynamicTextDisplay
                      arrayOfText={[`${characterData.powerstats.power}`]}
                      intervalTime={40}
                      delayTime={3000}
                      className={"characterDetails__powerStatQuantity"}
                      type={dynamicTextType.span}
                      enableFastDisplay={true}
                    />
                  )}
                </li>
                <li className="characterDetails__powerStatsListItem">
                  <span className="characterDetails__powerStatName">
                    Speed:
                  </span>
                  {!tabletResolution ? (
                    <span className="characterDetails__powerStatQuantity">
                      {characterData.powerstats.speed}
                    </span>
                  ) : (
                    <DynamicTextDisplay
                      arrayOfText={[`${characterData.powerstats.speed}`]}
                      intervalTime={40}
                      delayTime={3000}
                      className={"characterDetails__powerStatQuantity"}
                      type={dynamicTextType.span}
                      enableFastDisplay={true}
                    />
                  )}
                </li>
                <li className="characterDetails__powerStatsListItem">
                  <span className="characterDetails__powerStatName">
                    Strength:
                  </span>
                  {!tabletResolution ? (
                    <span className="characterDetails__powerStatQuantity">
                      {characterData.powerstats.strength}
                    </span>
                  ) : (
                    <DynamicTextDisplay
                      arrayOfText={[`${characterData.powerstats.strength}`]}
                      intervalTime={40}
                      delayTime={3000}
                      className={"characterDetails__powerStatQuantity"}
                      type={dynamicTextType.span}
                      enableFastDisplay={true}
                    />
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
