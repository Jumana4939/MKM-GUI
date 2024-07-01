import React, { useState, useContext } from "react";

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

    // Create a local state to hold the edited values
    const [editedReactions, setEditedReactions] = useState(inputReactions);

    function handleBackButton(){
        setCurrentBox("selectBox");
    }

    function handleResetButton(){
        setEditedReactions(inputReactions);
    }

    function handleSaveButton(){
        setInputReaction(editedReactions); 
    }

    // Handle change in input fields
    function handleInputChange(id, field, value) {
        setEditedReactions(prevReactions => 
            prevReactions.map(reaction => 
                reaction.id === id ? { ...reaction, [field]: parseFloat(value) } : reaction
            )
        );
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
                            <th className={styles.headerActivationEnergy}>Activation Energy (eV)</th>
                            <th className={styles.headerReactionEnergy}>Reaction Energy (eV)</th>
                            <th className={styles.headerReactionFacet}>Facet</th>
                        </tr>
                    </thead>

                    <tbody>
                        {editedReactions.map((reaction) => (
                            <tr key={reaction.id} className={`${styles.rows} ${reaction.dataSource === "AiScia" ? styles.aiSciaData: ""}`}>
                                <td className={styles.rowReaction}>{reaction.Equation}</td>
                                <td className={styles.rowSurface}>{reaction.surfaceComposition}</td>

                                <td className={styles.rowActivationEnergy}>
                                    <input type="number" value={reaction.activationEnergy || ""}
                                        className={styles.inputBox}
                                        onChange={(e) => handleInputChange(reaction.id, 'activationEnergy', e.target.value)}/>
                                </td>

                                <td className={styles.rowReactionEnergy}>
                                    <input type="number" value={reaction.reactionEnergy || ""}
                                        className={styles.inputBox}
                                        onChange={(e) => handleInputChange(reaction.id, 'reactionEnergy', e.target.value)}/>
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