import React, { useState, useEffect, useRef } from "react";

export default function SpecificWordGeneratorWithEffect({
  text,
  speed,
  increment,
  delayTime,
  className,
}) {
  /* na podstawie https://codepen.io/teddimagg/pen/NPZmje */
  const [block, setBlock] = useState("");
  const [fixed, setFixed] = useState("");

  const siRef = useRef(0);
  const striRef = useRef(0);

  useEffect(() => {
    const theLetters = "abcdefghijklmnopqrstuvwxyz#%&^+=-"; //You can customize what letters it will cycle through
    const clen = text.length;

    const rustle = (i) => {
      if (i > 0) {
        setTimeout(() => {
          rustle(i - 1);
          nextFrame();
          siRef.current = siRef.current + 1;
        }, speed);
      }
    };

    const nextFrame = () => {
      let currentStri = striRef.current;
      let currentSi = siRef.current;

      let newBlock = "";
      for (let i = 0; i < clen - currentStri; i++) {
        //Random number
        const num = Math.floor(theLetters.length * Math.random());
        //Get random letter
        const letter = theLetters.charAt(num);
        newBlock += letter;
      }
      setBlock(newBlock);

      if (currentSi === increment - 1) {
        currentStri++;
        striRef.current = currentStri;
      }

      if (currentSi === increment) {
        // Add a letter;
        // every speed*10 ms
        setFixed((prevFixed) => prevFixed + text.charAt(currentStri - 1));
        siRef.current = 0;
      }
    };

    const startTimeout = setTimeout(() => {
      rustle(clen * increment + 1);
    }, delayTime);

    return () => {
      // Cleanup function
      clearTimeout(startTimeout);
    };
  }, [text, speed, increment, delayTime]);

  return <span className={className}>{fixed + block}</span>;
}

/* 
Przykładowe wywołanie

<SpecificWordGeneratorWithEffect
  text={"Miklihvellur"}
  speed={20}
  increment={8}
  delayTime={2000}
/>

*/
