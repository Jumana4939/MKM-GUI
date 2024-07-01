import React, { useContext } from "react";

import { CurrentBoxContext } from "../../Pages/ParametersPage/ParametersPage";
import { InputReactionsContext } from "../../Pages/PageNavigationLogic/PageNavigationLogic";

import styles from "./EditEnergyValuesBox.module.css"

function EditEnergyValuesBox(){

    const {
        inputReactions, 
        setInputReaction
    } = useContext(InputReactionsContext);

    const {
        currentBox, 
        setCurrentBox
    } = useContext(CurrentBoxContext);

    function handleBackButton(){
        setCurrentBox("selectBox");
    }

    function handleResetButton(){
        return(null);
    }

    function handleSaveButton(){
        return(null); 
    }

    return(
        <>
        <div className={styles.container}>
            <div>
                <h2 className={styles.mainTitle}>Selected Reactions</h2>
            </div>
            
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.headers}>
                        <tr>
                            <th className={styles.headerReaction}>Reaction</th>
                            <th className={styles.headerSurface}>Surface</th>
                            <th className={styles.headerActivationEnergy}>Activation Energy</th>
                            <th className={styles.headerReactionEnergy}>Reaction Energy</th>
                            <th className={styles.headerReactionFacet}>Facet</th>
                        </tr>
                    </thead>

                    <tbody>
                        {inputReactions.map((reaction) => (
                            <tr key={reaction.id} className={`${styles.rows} ${reaction.dataSource === "AiScia" ? styles.aiSciaData: ""}`}>
                                <td className={styles.rowReaction}>{reaction.Equation}</td>
                                <td className={styles.rowSurface}>{reaction.surfaceComposition}</td>
                                <td className={styles.rowActivationEnergy}>
                                    {reaction.activationEnergy ? reaction.activationEnergy.toFixed(2) + " eV" : `NA`}
                                </td>
                                <td className={styles.rowReactionEnergy}>
                                    {reaction.reactionEnergy ? reaction.reactionEnergy.toFixed(2) + " eV" : `NA`}
                                </td>
                                <td className={styles.rowFacet}>{reaction.facet}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* update table buttons*/}
            <div className={styles.tableButtons}>
                <div>
                    <button onClick={handleResetButton} className={styles.resetButton}>Reset Values</button>
                </div>
                <div>
                    <button onClick={handleSaveButton} className={styles.saveButton}>Save Values</button>
                </div>
            </div>

            {/* Navigation/Other buttons*/}
            <div className={styles.otherButtons}>
                <div>
                    <button onClick={handleBackButton} className={styles.backButton}>&#8592; Back</button>
                </div>
            </div>

        </div>
        </>
    );
}

export default EditEnergyValuesBox