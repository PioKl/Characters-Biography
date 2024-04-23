import React, { createContext, useState, useEffect } from "react";

export const IntroContext = createContext();

const IntroContextProvider = (props) => {
  const [intro, setIntro] = useState(false);
  const [disableIntroStorage, setDisableIntroStorage] = useState(false); //inicjalizacja, jego wartość będzie związana z localStorage
  const [introRefreshStorage, setIntroRefreshStorage] = useState(true);
  const [firstTimeLoadDataStorage, setFirstTimeLoadDataStorage] =
    useState(true);

  useEffect(() => {
    //Stworzenie localStorage przy pierwszym uruchomieniu, gdzie wczytywane są dane
    if (localStorage.getItem("disableIntro") === null) {
      localStorage.setItem("disableIntro", "false");
      setDisableIntroStorage(localStorage.getItem("disableIntro"));
    } else if (localStorage.getItem("disableIntro") === "true") {
      localStorage.setItem("introRefresh", "false");
      setIntroRefreshStorage(false);
    }

    if (localStorage.getItem("introRefresh") === null) {
      localStorage.setItem("introRefresh", "true");
    }

    if (localStorage.getItem("firstTimeLoadData") === null) {
      localStorage.setItem("firstTimeLoadData", "true");
      setFirstTimeLoadDataStorage(true);
    }
  }, []);

  return (
    <IntroContext.Provider
      value={{
        intro,
        setIntro,
        disableIntroStorage,
        introRefreshStorage,
        firstTimeLoadDataStorage,
        setDisableIntroStorage,
        setIntroRefreshStorage,
        setFirstTimeLoadDataStorage,
      }}
    >
      {props.children}
    </IntroContext.Provider>
  );
};

export default IntroContextProvider;
