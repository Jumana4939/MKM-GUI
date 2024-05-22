import UpdateSelectionButton from "../../Buttons/UpdateSelectionButton/UpdateSelectionButton";
import ClearSelectionButton from "../../Buttons/ClearSelectionButton/ClearSelectionButton";
import NextStepButton from "../../Buttons/NextStepButton/NextStepButton";
import SelectedReactionsTable from "../../Tables/SelectedReactionsTable/SelectedReactionsTable";

import styles from "./SelectedReactionBox.module.css"

import { useContext, createContext, useState, useEffect } from "react";

export const ActiveReactionsContext = createContext();

function SelectedReactionBox(){

    const [activeSelection, setActiveSelection] = useState([]);

    const contextValues = {
        activeSelection, 
        setActiveSelection
    };

    return(
        <ActiveReactionsContext.Provider value={contextValues}>
            <div className={styles.container}>
                <h2 className={styles.title}>Selected Reactions</h2>

                <div className={styles.table}>
                    <SelectedReactionsTable/>
                </div>

                <div className={styles.buttons}>
                    <NextStepButton/>
                    <br /><br /><br />
                    <UpdateSelectionButton/>
                    <ClearSelectionButton/>
                </div>

            </div>
        </ActiveReactionsContext.Provider>
    );
}

export default SelectedReactionBox