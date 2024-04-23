import React, { useContext } from "react";
import { IntroContext } from "../contexts/IntroContext";
import "../styles/MainSite.scss";
import { ReactComponent as Bat } from "../svg/batModern.svg";
import Loader from "./Loader";
import DynamicTextDisplay from "./WordGenerators/DynamicTextDisplay";
import SpecificWordsGeneratorWithEffect from "./WordGenerators/SpecificWordsGeneratorWithEffect";

export default function MainSite() {
  const microChipArray = [
    "GOT-2",
    "ORE-29",
    "VSS-12",
    "RCT-95",
    "ARM_31",
    "LOD_1.10",
    "WOW_30",
    "VCK-45",
    "456-61",
    "DLN-0",
    "CONNECT_1",
    "RS-18",
  ];

  const decorationTwoArray = [
    "4000",
    "4553",
    "6778",
    "4800",
    "4706",
    "6778",
    "7311",
    "7882",
    "5662",
    "8822",
    "2234",
    "5667",
    "0223",
    "0222",
    "1223",
    "0112",
    "0512",
    "1273",
    "6728",
    "6772",
    "7871",
    "0919",
    "7895",
    "7877",
  ];

  const { intro, introRefreshStorage } = useContext(IntroContext);

  return (
    <>
      <div className="decorationTwo">
        {intro && (
          <SpecificWordsGeneratorWithEffect
            texts={decorationTwoArray}
            speed={100}
            increment={8}
            delayTime={4500}
            className="decorationTwoContainer"
            type={"list"}
            wordsType={"numbers"}
          />
        )}
      </div>

      <div className="decorationBytes">
        <div className="decorationBytesPartOne">
          {intro && (
            <DynamicTextDisplay
              arrayOfText={["D:/HOST_OPEN:D013"]}
              intervalTime={40}
              delayTime={4000}
              type={"span"}
            />
          )}
        </div>
        <div className="decorationBytesPartTwo">
          {intro && (
            <>
              <span className="decorationBytesPartTwo__span decorationBytesPartTwo__span--1">
                f:0000
              </span>
              <span className="decorationBytesPartTwo__span decorationBytesPartTwo__span--2">
                B00B55+
              </span>
              <span className="decorationBytesPartTwo__span decorationBytesPartTwo__span--3">
                C/022991
              </span>
              <span className="decorationBytesPartTwo__span decorationBytesPartTwo__span--4">
                409.876 bytes
              </span>
            </>
          )}
        </div>
      </div>

      <div className="decorationBlocksContainer">
        {intro && (
          <>
            <DynamicTextDisplay
              arrayOfText={["/ 01 / SYSTEM ACTIVATE"]}
              intervalTime={40}
              delayTime={2000}
              className="decorationBlocksContainer__span --system"
              type={"span"}
            />
            <span className="decorationBlocksContainer__span --error">
              / 02 / Errors - None
            </span>
            <div className="decorationBlocks">
              {Array.from({ length: 12 }, (_, index) => (
                <div
                  key={index}
                  className={`decorationBlock decorationBlock--${index + 1}`}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="decorationMicroChip">
        {intro &&
          Array.from({ length: Math.ceil(microChipArray.length / 4) }).map(
            (_, i) => (
              <ul key={i} className="decorationMicroChip__list">
                {/* 4 elementów w każym li na ul
                 */}
                {microChipArray.slice(i * 4, i * 4 + 4).map((item, index) => (
                  <li key={index} className="decorationMicroChip__listItem">
                    <DynamicTextDisplay
                      arrayOfText={[item]}
                      intervalTime={40}
                      delayTime={6700}
                      type={"span"}
                    />
                  </li>
                ))}
              </ul>
            )
          )}
      </div>

      <div className="systemActiveContainer">
        {intro && (
          <DynamicTextDisplay
            arrayOfText={["/ 03 / ALL SYSTEMS ACTIVE"]}
            intervalTime={40}
            delayTime={8000}
            className="systemActive"
            type={"span"}
          />
        )}
      </div>

      <Loader modifier={"mainSite"} />
      <div className="greetingsContainer">
        <h1 className="greetingsContainer__h1">Welcome</h1>
      </div>
      <div className={`batLogoContainer ${!introRefreshStorage && "--off"}`}>
        <Bat className="batLogo" />
      </div>
    </>
  );
}
