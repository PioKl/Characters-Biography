import React, { useState, useEffect, useRef } from "react";

export default function ManyRandomWordsGenerator({
  intervalTime,
  delayTime,
  wordLength,
  quantityOfWords,
}) {
  const [array, setArray] = useState([]);
  const characters = "0123456789";
  const intervalRef = useRef(null);

  useEffect(() => {
    const updateWords = () => {
      const newArray = Array.from({ length: quantityOfWords }, () =>
        Array(wordLength).fill("")
      );

      const innerInterval = (wordIndex, charIndex) => {
        if (wordIndex < quantityOfWords && charIndex < wordLength) {
          let counter = 0;
          intervalRef.current = setInterval(() => {
            if (counter < characters.length) {
              newArray[wordIndex][charIndex] = characters.charAt(
                Math.floor(Math.random() * characters.length)
              );
              setArray([...newArray]);
              counter += 1;
            } else {
              clearInterval(intervalRef.current);
              innerInterval(wordIndex, charIndex + 1);
            }
          }, intervalTime);
        } else if (wordIndex < quantityOfWords - 1) {
          innerInterval(wordIndex + 1, 0);
        }
      };

      innerInterval(0, 0);
    };

    const timeout = setTimeout(() => {
      updateWords();
    }, delayTime);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeout);
    };
  }, [intervalTime, delayTime, wordLength, quantityOfWords]);

  return (
    <div>
      {array.map((word, wordIndex) => (
        <div key={wordIndex}>
          <span>{word.join("")}</span>
        </div>
      ))}
    </div>
  );
}

/* 
Przykładowe wywołanie

<ManyRandomWordsGenerator
  intervalTime={20}
  delayTime={0}
  wordLength={5}
  quantityOfWords={2}
/>


<SpecificWordsGeneratorWithEffect
  texts={[
    "4000",
  ]}
  speed={100}
  increment={8}
  delayTime={4500}
  className="decorationTwoContainer"
  type={"list"}
  wordsType={"numbers"}
/>

*/
