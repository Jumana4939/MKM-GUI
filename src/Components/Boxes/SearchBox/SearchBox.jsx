import SearchInputBox from "../SearchInputBox/SearchInputBox";
import AddReactionButton from "../../Buttons/AddReactionButton/AddReactionButton";
import SearchResultsTable from "../../Tables/SearchResultsTable/SearchResultsTable";
import React, {useState, useEffect, createContext} from "react";

import styles from './SearchBox.module.css'

export const DatabaseContext = createContext();

function SearchBox(){

    const [reactionsDB, setReactionsDB] = useState([]);

    const contextValue = {
        reactionsDB, setReactionsDB
    };

    return(
        <DatabaseContext.Provider value={contextValue}> 
            <div className={styles.container}>
                <div className={styles.searchInput}>
                    <SearchInputBox/>
                </div>

                <div className={styles.table}>
                    <SearchResultsTable/>
                </div>

                <div className={styles.addReactions}>
                    <br /><br /><br />
                    <AddReactionButton/>
                </div>

            </div>
        </DatabaseContext.Provider> 
    );
}

export default SearchBox