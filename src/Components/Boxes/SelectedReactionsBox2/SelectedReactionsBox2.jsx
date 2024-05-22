import React, {useState, useContext}from "react";

import styles from "./SelectedReactionsBox2.module.css";
import { InputReactionsContext } from "../../../App";

function SelectedReactionsBox2(){

    const [activeSelection, setActiveSelection] = useState([]);

    const {
        inputReactions, 
        setInputReaction
    } = useContext(InputReactionsContext);

    function handleCheckboxChange(reaction){
        //check if the reaction is already selected
        const isSelected = activeSelection.some(selectedR => selectedR.id === reaction.id);

        if(isSelected){
            //if its already selected, remove it from the list
            setActiveSelection(prevActiveReactions => prevActiveReactions.filter(selectedR => selectedR.id !== reaction.id));
        } else {
            setActiveSelection(prevActiveReactions => [...prevActiveReactions, reaction]);
        }
    }


    return(
        <>
        <div className={styles.container}>
            {/* Selected reactions table*/}
            <div>
                <h2 className={styles.mainTitle}>Selected Reactions</h2>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.headers}>
                        <tr>
                            <th className={styles.headerSelect}>Select</th>
                            <th className={styles.headerReaction}>Reaction</th>
                            <th className={styles.headerSurface}>Surface</th>
                        </tr>
                    </thead>

                    <tbody>
                        {inputReactions.map((reaction) => (
                            <tr key={reaction.id} className={styles.rows}>
                                <td className={styles.rowSelect}>
                                    <input type="checkbox" 
                                            defaultChecked={true}
                                            onChange={() => handleCheckboxChange(reaction)}/>
                                </td>
                                <td className={styles.rowReaction}>{reaction.Equation}</td>
                                <td className={styles.rowSurface}>{reaction.surfaceComposition}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Unselected reactions table*/}
            <div>
                <h3 className={styles.subTitle}>Unselected Reactions</h3>
            </div>
            <div className={styles.tableContainer}>
            <table className={styles.table}>
                    <thead className={styles.headers}>
                        <tr>
                            <th className={styles.headerSelect}>Select</th>
                            <th className={styles.headerReaction}>Reaction</th>
                            <th className={styles.headerSurface}>Surface</th>
                        </tr>
                    </thead>

                    <tbody>
                        {inputReactions.map((reaction) => (
                            <tr key={reaction.id} className={styles.rows}>
                                <td className={styles.rowSelect}>
                                    <input type="checkbox" 
                                            defaultChecked={true}
                                            onChange={() => handleCheckboxChange(reaction)}/>
                                </td>
                                <td className={styles.rowReaction}>{reaction.Equation}</td>
                                <td className={styles.rowSurface}>{reaction.surfaceComposition}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* update table buttons*/}
            <div className={styles.tableButtons}>
                <div>
                    <button className={styles.updateButton}>Update Selection</button>
                </div>
                <div>
                    <button className={styles.clearButton}>Clear Selection</button>
                </div>
            </div>

            {/* Other buttons*/}
            <div className={styles.otherButtons}>
                <div>
                    <button className={styles.backButton}>&#8592; Back to Search</button>
                </div>
                <div>
                    <button className={styles.editButton}>Edit Energy Values</button>
                </div>
            </div>


        </div>
        </>
    )
}

export default SelectedReactionsBox2