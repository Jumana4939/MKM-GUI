import Header from "../../Header/Header";
import SearchBox from "../../Boxes/SearchBox/SearchBox";
import SelectedReactionBox from "../../Boxes/SelectedReactionBox/SelectedReactionBox";
import Footer from "../../Footer/Footer";

import styles from "./SearchPage.module.css"

import { createContext, useState } from "react";

export const ReactionsContext = createContext();

function SearchPage(){

    const [selectedReactions, setSelectedReactions] = useState([]);
    const [currentReactions, setCurrentReaction] = useState([]);

    const contextValue = {
        selectedReactions,
        setSelectedReactions, 
        currentReactions, 
        setCurrentReaction
    };

    return(
        <>
            <Header />

            <ReactionsContext.Provider value={contextValue}>
                <div className={styles.container}>
                    <div className={styles.search}>
                        <SearchBox />
                    </div>

                    <div className={styles.selected}>
                        <SelectedReactionBox />
                    </div>
                </div>
            </ReactionsContext.Provider>

            <Footer/>
  
        </>
    );
}

export default SearchPage