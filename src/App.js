import { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IntroContextProvider from "./contexts/IntroContext";
import "./styles/App.scss";
import Intro from "./components/Intro";
import Header from "./components/Header";
import MainSite from "./components/MainSite";
import CharactersBios from "./components/CharactersBios";
import CharacterDetails from "./components/CharacterDetails";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";

function App() {
  //Zresetowanie w localStorage currentPage i firstTimeLoadData przy odświeżeniu, żeby zaczynał od pierwszej strony
  useEffect(() => {
    const handleBeforeUnload = () => {
      resetLocalStorageCurrentPage();
      resetLocalStorageFirstTimeLoadData();
      resetLocalStorageIntroRefresh();
    };

    const resetLocalStorageCurrentPage = () => {
      localStorage.removeItem("currentPage");
    };

    const resetLocalStorageFirstTimeLoadData = () => {
      localStorage.removeItem("firstTimeLoadData");
    };

    const resetLocalStorageIntroRefresh = () => {
      localStorage.removeItem("introRefresh");
    };

    //nasłuchiwanie przy odświeżeniu
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      //usunięcie nasłuchiwania
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  //Referencja potrzebna w GSAP
  const container = useRef();

  const [blockMainSite, setBlockMainSite] = useState(false);

  return (
    <div className="App" ref={container}>
      <IntroContextProvider>
        <Router>
          <Header />
          <Intro />
          <main className="main">
            <Routes>
              <Route path="*" element={<ErrorPage />} />
              <Route
                path="/"
                element={
                  <>
                    <CharactersBios
                      setBlockMainSite={setBlockMainSite}
                      container={container}
                    />
                    {!blockMainSite && <MainSite container={container} />}
                  </>
                }
              />
              <Route
                path="/characters/:slug"
                element={
                  <CharacterDetails
                    setBlockMainSite={setBlockMainSite}
                    container={container}
                  />
                }
              />
            </Routes>
          </main>
          <Footer />
        </Router>
      </IntroContextProvider>
    </div>
  );
}

export default App;
