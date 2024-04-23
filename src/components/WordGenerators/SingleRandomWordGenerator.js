import React, { useState, useEffect, useRef } from "react";

export default function SingleRandomWordGenerator({
  intervalTime,
  delayTime,
  wordLength,
  type,
}) {
  const [array, setArray] = useState([""]);

  let characters;
  if (type === "numbers") {
    characters = "0123456789";
  } else if (type === "numbersAndSpecial") {
    characters = "0123456789#%&^+=-";
  } else if (type === "normal") {
    characters = "abcdefghijklmnopqrstuvwxyz#%&^+=-";
  } else {
    characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  }
  //const characters = "0123456789";
  const intervalRef = useRef(null);

  useEffect(() => {
    const updateWord = () => {
      const newArray = Array(wordLength).fill(""); // Inicjalizacja nowej tablicy z pustymi stringami o danej długości

      let index = 0;

      const innerInterval = () => {
        if (index < wordLength) {
          let counter = 0;
          intervalRef.current = setInterval(() => {
            if (counter < characters.length) {
              newArray[index] = characters.charAt(
                Math.floor(Math.random() * characters.length)
              );
              setArray([...newArray]);
              counter += 1;
            } else {
              clearInterval(intervalRef.current);
              index += 1;
              innerInterval();
            }
          }, intervalTime);
        }
      };

      innerInterval();
    };

    // Wywołaj funkcję updateWord z opóźnieniem 2 sekund
    const timeout = setTimeout(() => {
      updateWord();
    }, delayTime);

    // Zatrzymaj timeout przed usunięciem komponentu
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeout);
    };
  }, [intervalTime, delayTime, wordLength, characters]);
  return (
    <div>
      <span>{array.join("")}</span>
    </div>
  );
}

/* 
Przykładowe wywołanie

<SingleRandomWordGenerator
  intervalTime={20}
  delayTime={2000}
  wordLength={5}
  type={"numbers"}
/>

*/
