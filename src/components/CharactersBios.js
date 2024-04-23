import React, { useEffect, useState, useContext } from "react";
import "../styles/CharactersBios.scss";
import CharacterBioCard from "./CharacterBioCard";
import resolution from "../styles/Resolutions.scss";
import { emToPixels } from "../utils/emToPixels";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { IntroContext } from "../contexts/IntroContext";

export default function CharactersBios({ setBlockMainSite }) {
  const { intro, introRefreshStorage } = useContext(IntroContext);

  //jeśli jest jakaś strona ustalona w localStorage, to niech ją weźmie, a jak nie to ustaw na 1
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  let itemsPerPage = 12;
  let maxButtons = 12; //parzysta liczba

  if (window.innerWidth > 1080) {
    itemsPerPage = 12;
    maxButtons = 12;
  } else if (window.innerWidth > 899) {
    itemsPerPage = 10;
    maxButtons = 12;
  } else if (window.innerWidth > emToPixels(resolution.bpTablet)) {
    itemsPerPage = 8;
    maxButtons = 12;
  } else if (window.innerWidth > 699) {
    itemsPerPage = 10;
    maxButtons = 8;
  } else if (window.innerWidth > 576) {
    itemsPerPage = 8;
    maxButtons = 8;
  } else if (window.innerWidth > 438) {
    itemsPerPage = 6;
    maxButtons = 4;
  } else if (window.innerWidth > 359) {
    itemsPerPage = 4;
    maxButtons = 2;
  } else {
    itemsPerPage = 2;
    maxButtons = 2;
  }

  const [hoveredCharacterName, setHoveredCharacterName] = useState(null);

  /* https://akabab.github.io/superhero-api/api/#alljson */
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("https://akabab.github.io/superhero-api/api/all.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);

    const newDataList = data.filter((item) => {
      return item.name.toLowerCase().includes(inputValue.toLowerCase());
    });
    setFilteredData(newDataList);
    setCurrentPage(1); // Resetowanie bieżącej strony po wyszukaniu
    localStorage.setItem("currentPage", 1); //Zapisanie w localStorage strony
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber.toString()); //Zapisanie w localStorage strony
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
    localStorage.setItem("currentPage", (currentPage - 1).toString()); //Zapisanie w localStorage strony
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
    localStorage.setItem("currentPage", (currentPage + 1).toString()); //Zapisanie w localStorage strony
  };

  const renderPageButtons = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pageButtons = [];

    // Obliczenie pierwszej strony przycisków
    let firstPage;
    if (totalPages <= maxButtons) {
      // Jeśli liczba wszystkich stron jest mniejsza lub równa maksymalnej liczbie przycisków,
      // ustaw pierwszą stronę przycisków na 2, aby uniknąć dublowania pierwszej strony
      firstPage = 2;
    } else if (currentPage <= Math.floor(maxButtons / 2) + 1) {
      // Jeśli bieżąca strona jest mniejsza lub równa połowie maksymalnej liczby przycisków plus 1,
      // ustaw pierwszą stronę przycisków na 2
      // To sprawia, że jest zawsze przestrzeń na początku, aby zapewnić pełny zakres przycisków
      firstPage = 2;
    } else if (currentPage >= totalPages - Math.floor(maxButtons / 2)) {
      // Jeśli bieżąca strona jest większa lub równa różnicy między całkowitą liczbą stron a połową maksymalnej liczby przycisków,
      // ustaw pierwszą stronę przycisków na totalPages minus maksymalna liczba przycisków plus 1
      // To sprawia, że przyciski skupią się na końcu, aby zapewnić pełny zakres przycisków
      firstPage = totalPages - maxButtons + 1;
    } else {
      // W przeciwnym razie, jeśli bieżąca strona znajduje się w środku,
      // ustaw pierwszą stronę przycisków na bieżącą stronę minus połowę maksymalnej liczby przycisków
      // + 1 spowoduje, że dokładnie w połowie będzie wyłączony przycisk na lewo jak i na prwo będzie taka sama liczba przycisków
      firstPage = currentPage - Math.floor(maxButtons / 2) + 1;
    }

    // Dodanie przycisku dla pierwszej strony
    pageButtons.push(
      <React.Fragment key={1}>
        <button
          /* Warunek jest po to, że jak zacznę przewijać strony i zmieni się na np. układ 1 3 4 itd to wtedy pojawią się kropki */
          className={`pagination__button ${
            currentPage - Math.floor(maxButtons / 2) >= 2
              ? "--dots"
              : "--no-dots"
          }`}
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
        >
          {1}
        </button>
        {currentPage - Math.floor(maxButtons / 2) >= 2 && (
          <span className="pagination__dots">...</span>
        )}
      </React.Fragment>
    );

    // Dodanie przycisków dla stron w zakresie od firstPage do firstPage + maxButtons - 1
    for (let i = firstPage; i < firstPage + maxButtons - 1; i++) {
      if (i > 1 && i < totalPages) {
        pageButtons.push(
          <button
            className="pagination__button"
            key={i}
            onClick={() => goToPage(i)}
            disabled={currentPage === i}
          >
            {i}
          </button>
        );
      }
    }

    // Dodanie przycisku dla ostatniej strony
    pageButtons.push(
      <React.Fragment key={totalPages}>
        {currentPage + Math.floor(maxButtons / 2) + 1 <= totalPages && (
          <span className="pagination__dots">...</span>
        )}
        <button
          className={`pagination__button ${
            currentPage + Math.floor(maxButtons / 2) + 1 <= totalPages
              ? "--dots"
              : "--no-dots"
          }`}
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </button>
      </React.Fragment>
    );

    return pageButtons;
  };

  // Funkcja do aktualizacji wyświetlanego imienia postaci
  const handleHoverName = (character) => {
    setHoveredCharacterName(character);
  };

  //Ilość postaci na stronę, indexy potrzebne do slice
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);

  return (
    <>
      <div className="charactersBios">
        {(intro || !introRefreshStorage) && (
          <>
            <Loader modifier={"biosFakeLoader"} borders={"remove"} />
            {data.length > 0 ? (
              <div
                onMouseEnter={() => handleHoverName("Pick Character")}
                className={`charactersBiosContainer ${
                  !filteredData.length > 0 && "--notFound"
                }`}
              >
                <div className="characterNameAndSearchContainer">
                  <div className="characterNameContainer">
                    <span className="characterNameContainer__profile">
                      Profile
                    </span>
                    <span className="characterNameContainer__name">
                      {!filteredData.length > 0 ? (
                        "Not Found"
                      ) : (
                        <>
                          {hoveredCharacterName
                            ? hoveredCharacterName
                            : "Pick Character"}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="characterSearchContainer">
                    <input
                      className="characterSearchContainer__input"
                      type="text"
                      onChange={handleSearch}
                      value={searchValue}
                      placeholder="Search Character"
                    />
                  </div>
                </div>

                {filteredData.length > 0 ? (
                  <div className="charactersCardsContainer">
                    {filteredData.slice(startIndex, endIndex).map((item) => (
                      <CharacterBioCard
                        key={item.id}
                        item={item}
                        setBlockMainSite={setBlockMainSite}
                        handleHoverName={handleHoverName}
                      />
                    ))}
                  </div>
                ) : (
                  <ErrorMessage message={"Character does not exists"} />
                )}

                {
                  //Jeśli ilość stron jest większa niż 1 to dopiero wtedy wyświetlaj pasek ze stronami postaci
                  Math.ceil(filteredData.length / itemsPerPage) > 1 && (
                    <div className="pagination">
                      {/* Przycisk do przewijania w lewo */}
                      <button
                        className="pagination__button --arrow-left"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                      ></button>
                      {/* Przyciski stron */}
                      {renderPageButtons()}
                      {/* Przycisk do przewijania w prawo */}
                      <button
                        className="pagination__button --arrow-right"
                        onClick={goToNextPage}
                        disabled={
                          currentPage ===
                          Math.ceil(filteredData.length / itemsPerPage)
                        }
                      ></button>
                    </div>
                  )
                }
              </div>
            ) : (
              <Loader modifier={"centered"} />
            )}
          </>
        )}
      </div>
    </>
  );
}
