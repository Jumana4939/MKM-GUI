import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, createContext, useEffect} from "react";
import SearchPage from "./Components/Pages/SearchPage/SearchPage";
import ParametersPage from "./Components/Pages/ParametersPage/ParametersPage";
import ReactionDetailsPage from './Components/Pages/ReactionDetailsPage/ReactionDetailsPage';


export const CurrentViewContext = createContext(); 
export const InputReactionsContext = createContext();

function App() {

  const [currentView, setCurrentView] = useState('searchPage');

  const [inputReactions, setInputReaction] = useState([]);

  const viewContextValues = {
    currentView, 
    setCurrentView
  };

  const inputReactionContextValues = {
    inputReactions, 
    setInputReaction
  };

  useEffect(()=>{
    console.log("inputReactions: ",inputReactions);
  },[])

  useEffect(() => {
    handleWindowView();
  }, [currentView]);

  function handleWindowView(){
      if(currentView === "searchPage"){
        return <SearchPage />;
      } else if (currentView === "parametersPage") {
        return <ParametersPage />;
      }
  }

  return(
    <>
      <BrowserRouter>
      <CurrentViewContext.Provider value={viewContextValues}>
        <InputReactionsContext.Provider value={inputReactionContextValues}>
          <Routes>
            <Route path="/"  element={handleWindowView()} />
            <Route path="/reaction-details/:id" element={<ReactionDetailsPage/>} />
          </Routes>
        </InputReactionsContext.Provider>
      </CurrentViewContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App
