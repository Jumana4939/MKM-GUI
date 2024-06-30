import { useState, createContext, useEffect} from "react";
import SearchPage from "../SearchPage/SearchPage";
import ParametersPage from "../ParametersPage/ParametersPage";

export const CurrentViewContext = createContext(); 
export const InputReactionsContext = createContext();

function PageNavigationLogic(){
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
            <CurrentViewContext.Provider value={viewContextValues}>
                <InputReactionsContext.Provider value={inputReactionContextValues}>
                    {handleWindowView()}
                </InputReactionsContext.Provider>
            </CurrentViewContext.Provider>
        </>
    );
}

export default PageNavigationLogic