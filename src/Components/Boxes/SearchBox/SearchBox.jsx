import SearchInputBox from "../SearchInputBox/SearchInputBox";
import AddReactionButton from "../../Buttons/AddReactionButton/AddReactionButton";
import SearchResultsTable from "../../Tables/SearchResultsTable/SearchResultsTable";
import React, {useState, useEffect, createContext} from "react";

import styles from './SearchBox.module.css'

export const DatabaseContext = createContext();
export const TableControlsContext = createContext(); 

function SearchBox(){

    const [reactionsDB, setReactionsDB] = useState([]);

    const contextValue = {
        reactionsDB, setReactionsDB
    };

    //table controls variable
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const controlContextValues = {
        page, setPage,
        totalPages, setTotalPages
    };

    return(
        <DatabaseContext.Provider value={contextValue}> 
        <TableControlsContext.Provider value={controlContextValues}>
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
            </TableControlsContext.Provider>
        </DatabaseContext.Provider> 
    );
}

export default SearchBox