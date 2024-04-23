import React, { useState, useEffect } from "react";

export default function DynamicTextDisplay({
  arrayOfText,
  intervalTime,
  delayTime,
  className,
  type,
  enableFastDisplay,
}) {
  let ComponentType;
  ComponentType = type;

  // Stan przechowujący aktualnie wyświetlany tekst
  const [newArray, setNewArray] = useState([]);

  useEffect(() => {
    // Zmienna przechowująca indeks aktualnie wyświetlanego słowa
    let currentWordIndex = 0;
    // Id interwału, używane do późniejszego czyszczenia interwału
    let intervalId = null;
    const updateText = () => {
      setNewArray((prevArray) => {
        const updatedArray = prevArray.map((text, index) => {
          if (currentWordIndex === index) {
            //Chodzi o to, że pojedyncza literka będzie dodawana do tablicy, np: przekazałem jako arrayOfText [Mojo, Test], to będzie pojedynczą literkę dodawał do updatedArry, żeby był efekt pisania litery i porównuje tutaj, warunek zostanie spełniony dopiero gdy, każda dodana litera utworzy takie samo słowo, czyli length będzie się zgadzał
            if (text.length < arrayOfText[index].length) {
              return text + arrayOfText[index][text.length];
            } else {
              // Jeśli długość aktualnego tekstu jest równa długości tekstu z tablicy, przejdź do kolejnego słowa
              currentWordIndex++;
              //przechodzi do następnego słowa, gdy dojdzie do ostatniego elementu prevArray, nie ma następnego słowa niech zwróci text, aby wyświetlić ostatnie słowo
              return prevArray[index + 1] || text;
            }
          } else {
            return text;
          }
        });
        return updatedArray;
      });
    };

    // Inicjalizacja tablicy z pustymi łańcuchami
    setNewArray(arrayOfText.map(() => ""));

    //Opóźnienie
    const timeoutDelay = setTimeout(() => {
      // Rozpoczęcie interwału
      intervalId = setInterval(updateText, intervalTime);
    }, delayTime);

    // Obsługa kliknięcia na obszarze okna
    const handleClick = () => {
      // Zatrzymanie interwału
      clearInterval(intervalId);
      // Natychmiastowe wyświetlenie całego tekstu po kliknięciu
      setNewArray(arrayOfText.map((word) => word));
    };

    // Dodanie nasłuchiwania zdarzenia kliknięcia na obszarze okna jeśli zmienna enableFastDisplay wynosi true
    enableFastDisplay && window.addEventListener("click", handleClick);

    // Zwolnienie zasobów po odmontowaniu komponentu
    return () => {
      clearInterval(intervalId); // Czyszczenie interwału
      clearTimeout(timeoutDelay); // Czyszczenie opóźnienia
      window.removeEventListener("click", handleClick); // Usunięcie nasłuchiwania kliknięcia
    };
  }, [arrayOfText, intervalTime, delayTime, enableFastDisplay]);

  return (
    <>
      {type === "list" && (
        <div className={className}>
          {/* Podział tablicy na 4 ul każda po 6 elementów, czyli 24/6 = 4 */}
          {Array.from({ length: Math.ceil(newArray.length / 6) }).map(
            (_, i) => (
              <ul key={i}>
                {/* 6 elementów w każym li na ul       
               i=0 0,6
               i=1 6,12
               i=2 12,18
               i=3 18,24
                */}
                {newArray.slice(i * 6, i * 6 + 6).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )
          )}
        </div>
      )}
      {type !== "list" && (
        <>
          {newArray.map((item, index) => (
            <ComponentType className={className} key={index}>
              {item}
            </ComponentType>
          ))}
        </>
      )}
    </>
  );
}

/* 
Przykładowe wywołanie

<DynamicTextDisplay
  arrayOfText={["/ 01 / SYSTEM ACTIVATE"]}
  intervalTime={40}
  delayTime={2000}
  className="decorationBlocksContainer__span --system"
  type={"span"}
/>

*/
