import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { IntroContext } from "../contexts/IntroContext";
import SnowEffect from "../components/SnowEffect/SnowEffect";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "../styles/Intro.scss";
import color from "../styles/Colors.scss";
import resolution from "../styles/Resolutions.scss";
import { emToPixels } from "../utils/emToPixels";

export default function Intro({ container }) {
  const location = useLocation();
  const {
    intro,
    setIntro,
    disableIntroStorage,
    introRefreshStorage,
    firstTimeLoadDataStorage,
  } = useContext(IntroContext);

  const { contextSafe } = useGSAP({ scope: container });

  const handleIntroBegin = contextSafe(() => {
    setIntro(true);

    gsap.from(".block", { width: "100%", duration: 0 });
    gsap.to(".block", { width: "0%", duration: 3.5 });

    if (window.innerWidth > emToPixels(resolution.bpTablet)) {
      gsap.from(".batLogo", { scale: 0.5, opacity: 0, duration: 4 });
      gsap.from(".batLogoPath", { fill: "white", duration: 4 });
      gsap.to(".batLogoPath", { fill: "black", duration: 4 });
      gsap.to(".batLogoPath", {
        fill: `${color.vividSkyBlue}`,
        delay: 3.5,
        duration: 4,
      });

      gsap.fromTo(
        //loaderContainer z modyfikatorem mainSite
        ".loaderContainer[class*='--mainSite']",
        { opacity: 0, delay: 0 },
        { opacity: 1, duration: 5, delay: 4 }
      );

      gsap.fromTo(
        ".decorationBytesPartOne",
        { opacity: 0, delay: 0 },
        { opacity: 1, duration: 5, delay: 4 }
      );

      gsap.fromTo(
        ".decorationBytesPartTwo",
        {
          width: "35rem",
          duration: 0,
          opacity: 0,
          x: -100,
          delay: 0,
        },
        {
          width: "60rem",
          duration: 1.5,
          opacity: 1,
          x: 0,
          delay: 5,
        }
      );

      gsap.to(".decorationBlocksContainer", {
        opacity: 1,
        delay: 2,
        druation: 0.5,
      });

      gsap.fromTo(
        ".decorationMicroChip",
        { opacity: 0, duration: 0, x: 150, delay: 0 },
        { opacity: 1, duration: 1.5, x: 0, delay: 4.5 }
      );

      gsap.fromTo(
        ".decorationMicroChip__list",
        { opacity: 0, duration: 0, y: 150, delay: 0 },
        { opacity: 1, duration: 1.5, y: 0, delay: 5.7 }
      );

      gsap.fromTo(
        ".decorationMicroChip__listItem",
        { opacity: 0, duration: 0, delay: 0 },
        { opacity: 1, duration: 1.5, delay: 6.2 }
      );

      gsap.fromTo(
        ".systemActiveContainer",
        {
          opacity: 0,
          duration: 0,
          delay: 0,
          userSelect: "none",
        },
        {
          opacity: 1,
          duration: 1.5,
          delay: 8,
        }
      );
      gsap.fromTo(
        ".systemActiveContainer",
        {
          boxShadow: "transparent 0px 0px 0px 0px",
        },
        {
          boxShadow: `${color.vividSkyBlue} 0px 1px 8px 3px`,
          opacity: 1,
          delay: 9,
          duration: 1,
        }
      );

      gsap.fromTo(
        ".greetingsContainer__h1",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          textShadow: `0 0 0.6rem ${color.vividSkyBlue}, 0 0 1.5rem ${color.vividSkyBlue},-0.2rem 0.1rem 1rem ${color.vividSkyBlue}, 0.2rem 0.1rem 1rem ${color.vividSkyBlue},0 -0.5rem 2rem ${color.vividSkyBlue}, 0 0.5rem 3rem ${color.vividSkyBlue}`,
          delay: 10,
          duration: 2,
        }
      );

      gsap.to(
        ".decorationBlocksContainer, .decorationBytes, .decorationMicroChip, .systemActiveContainer",
        {
          opacity: 0,
          delay: 11,
          duration: 1,
        }
      );
      gsap.fromTo(
        ".decorationTwo",
        { opacity: 0, delay: 0 },
        { opacity: 1, duration: 3, delay: 4.5 }
      );
      gsap.to(".decorationTwo", {
        x: -500,
        delay: 11,
        duration: 2,
      });

      gsap.to(
        //.loaderContainer[class*='--mainSite'] .loader czyli weźmie .loader, który ma rodzica o klasie .loaderContainer --mainSite
        ".loaderContainer[class*='--mainSite'] .loader, loaderContainer[class*='--mainSite'] .loaderInside",
        {
          opacity: 0,
          delay: 11,
          duration: 1,
        }
      );

      gsap.to(
        ".greetingsContainer, .batLogoContainer, .loaderContainer[class*='--mainSite']",
        {
          opacity: 0,
          delay: 13,
          duration: 1,
        }
      );
      gsap.to(
        ".decorationBlocksContainer, .decorationBytes, .decorationMicroChip, .systemActiveContainer, .decorationTwo, .greetingsContainer, .batLogoContainer, .loaderContainer[class*='--mainSite']",
        {
          display: "none",
          delay: 14,
          duration: 0,
        }
      );

      gsap.fromTo(
        ".charactersBios",
        { opacity: 0, delay: 0, pointerEvents: "none" },
        { opacity: 1, duration: 2, delay: 14, pointerEvents: "auto" }
      );

      gsap.fromTo(
        ".header",
        { y: -100, delay: 0 },
        { y: 0, duration: 2, delay: 13 }
      );

      gsap.fromTo(
        ".footer",
        { opacity: 0, delay: 0 },
        { opacity: 1, duration: 2, delay: 14 }
      );
    } else {
      //Mobilna wersja
      gsap.from(".batLogo", { scale: 0.5, opacity: 0, duration: 4 });
      gsap.from(".batLogoPath", { fill: "white", duration: 4 });
      gsap.to(".batLogoPath", { fill: "black", duration: 4 });

      gsap.to(".batLogoPath", {
        fill: `${color.vividSkyBlue}`,
        delay: 3.5,
        duration: 4,
      });

      gsap.to(".decorationBlocksContainer", {
        opacity: 1,
        delay: 2,
        druation: 0.5,
      });

      gsap.fromTo(
        ".greetingsContainer__h1",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          textShadow: `0 0 0.6rem ${color.vividSkyBlue}, 0 0 1.5rem ${color.vividSkyBlue},-0.2rem 0.1rem 1rem ${color.vividSkyBlue}, 0.2rem 0.1rem 1rem ${color.vividSkyBlue},0 -0.5rem 2rem ${color.vividSkyBlue}, 0 0.5rem 3rem ${color.vividSkyBlue}`,
          delay: 6,
          duration: 2,
        }
      );

      gsap.to(".decorationBlocksContainer", {
        opacity: 0,
        delay: 8,
        duration: 1,
      });

      gsap.to(".batLogoContainer, .greetingsContainer", {
        opacity: 0,
        delay: 9,
        duration: 1,
      });

      gsap.to(
        ".batLogoContainer, .greetingsContainer, .decorationBlocksContainer",
        {
          display: "none",
          delay: 10,
          duration: 0,
        }
      );

      gsap.fromTo(
        ".charactersBios",
        { opacity: 0, delay: 0, pointerEvents: "none" },
        { opacity: 1, duration: 2, delay: 10, pointerEvents: "auto" }
      );

      gsap.fromTo(
        ".header",
        { y: -100, delay: 0 },
        { y: 0, duration: 2, delay: 9 }
      );

      gsap.fromTo(
        ".footer",
        { opacity: 0, delay: 0 },
        { opacity: 1, duration: 2, delay: 10 }
      );
    }
  });

  return (
    <>
      <div
        className={`intro ${
          location.pathname === "/" ? "--enable" : "--remove"
        } ${(!introRefreshStorage || !firstTimeLoadDataStorage) && "--off"}`}
      >
        {!intro && !disableIntroStorage && (
          <SnowEffect count={150} options={{ color: "red" }} intro={intro} />
        )}

        <div className="blockContainer">
          <div className="blockOverlay">
            {Array.from({ length: 20 }, (_, index) => (
              <div key={index} className={`block block-${index + 1}`}></div>
            ))}
          </div>
        </div>

        {!intro && !disableIntroStorage && (
          <button className="introButton" onClick={handleIntroBegin}>
            Begin
          </button>
        )}
      </div>
    </>
  );
}
