import React, { useState, useEffect, useRef } from "react";
export default function SpecificWordsGeneratorWithEffect({
  texts,
  speed,
  increment,
  delayTime,
  type,
  className,
  wordsType,
}) {
  const [blocks, setBlocks] = useState(Array(texts.length).fill(""));
  const [fixeds, setFixeds] = useState(Array(texts.length).fill(""));

  const siRef = useRef([]);
  const striRef = useRef([]);

  useEffect(() => {
    const numbers = "0123456789#%&^+=-";
    const normal = "abcdefghijklmnopqrstuvwxyz#%&^+=-";
    const theLetters = wordsType === "numbers" ? numbers : normal;

    texts.forEach((text, index) => {
      const clen = text.length;
      siRef.current[index] = 0;
      striRef.current[index] = 0;

      const rustle = (i, textIndex) => {
        if (i > 0) {
          setTimeout(() => {
            rustle(i - 1, textIndex);
            nextFrame(textIndex);
            siRef.current[textIndex] = siRef.current[textIndex] + 1;
          }, speed);
        }
      };

      const nextFrame = (textIndex) => {
        let currentStri = striRef.current[textIndex];
        let currentSi = siRef.current[textIndex];

        let newBlock = "";
        for (let i = 0; i < clen - currentStri; i++) {
          //Random number
          const num = Math.floor(theLetters.length * Math.random());
          //Get random letter
          const letter = theLetters.charAt(num);
          newBlock += letter;
        }

        setBlocks((prevBlocks) => {
          const newBlocks = [...prevBlocks];
          newBlocks[textIndex] = newBlock;
          return newBlocks;
        });

        if (currentSi === increment - 1) {
          currentStri++;
          striRef.current[textIndex] = currentStri;
        }

        if (currentSi === increment) {
          setFixeds((prevFixeds) => {
            const newFixeds = [...prevFixeds];
            newFixeds[textIndex] =
              (newFixeds[textIndex] || "") + text.charAt(currentStri - 1);
            return newFixeds;
          });
          siRef.current[textIndex] = 0;
        }
      };

      setTimeout(() => {
        rustle(clen * increment + 1, index);
      }, delayTime);
    });
  }, [texts, speed, increment, delayTime, wordsType]);

  return (
    <>
      {type === "list" && (
        <div className={className}>
          {/* Podział tablicy na 4 ul każda po 6 elementów, czyli 24/6 = 4 */}
          {Array.from({ length: Math.ceil(texts.length / 6) }).map((_, i) => (
            <ul key={i}>
              {/* 6 elementów w każdym li na ul       
             i=0 0,6
             i=1 6,12
             i=2 12,18
             i=3 18,24
            */}
              {texts.slice(i * 6, i * 6 + 6).map((text, index) => (
                <li key={index}>
                  {fixeds[i * 6 + index] + blocks[i * 6 + index]}
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}
    </>
  );
}
