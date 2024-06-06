import React, {useState, useContext, useEffect}from "react";

import styles from "./SelectedReactionsBox2.module.css";
import { InputReactionsContext } from "../../../App";
import { CurrentViewContext } from "../../../App";

function SelectedReactionsBox2(){

    const [activeSelection, setActiveSelection] = useState([]);
    const [unselectedReactions, setUnselectedReactions] = useState([]);
    const [reselectReaction, setReselectReaction] = useState([]);

    useEffect(()=> {
        console.log("reselectReaction:", reselectReaction);
    }, [reselectReaction]);

    useEffect(()=> {
        console.log("unselectedReactions:", unselectedReactions);
    }, [unselectedReactions]);

    const {
        inputReactions, 
        setInputReaction
    } = useContext(InputReactionsContext);

    const {
        currentView, setCurrentView
    } = useContext(CurrentViewContext);

    function handleCheckboxChangeInSelected(reaction) {
        const isSelected = activeSelection.some(selectedR => selectedR.id === reaction.id);

        if (isSelected) {
            setActiveSelection(prevActiveReactions => prevActiveReactions.filter(selectedR => selectedR.id !== reaction.id));
        } else {
            setActiveSelection(prevActiveReactions => [...prevActiveReactions, reaction]);
        }
    }

    function handleCheckboxChangeInUnselected(reaction) {
        const isSelected = reselectReaction.some(reselectR => reselectR.id === reaction.id);
        if (isSelected) {
            setReselectReaction(prevReselectReactions => prevReselectReactions.filter(reselectR => reselectR.id !== reaction.id));
        } else {
            setReselectReaction(prevReselectReactions => [...prevReselectReactions, reaction]);
        }
    }

    function handleUpdateSelection() {
        const updatedInputReactions = [
            ...inputReactions.filter(reaction => !activeSelection.some(selectedR => selectedR.id === reaction.id)),
            ...reselectReaction.filter(reaction => !inputReactions.some(inputR => inputR.id === reaction.id))
        ];
        const updatedUnselectedReactions = [
            ...unselectedReactions.filter(reaction => !reselectReaction.some(reselectR => reselectR.id === reaction.id)),
            ...activeSelection.filter(reaction => !unselectedReactions.some(unselectedR => unselectedR.id === reaction.id))
        ];

        setInputReaction(updatedInputReactions);
        setUnselectedReactions(updatedUnselectedReactions);
        setActiveSelection([]);
        setReselectReaction([]);
    }

    function handleClearSelection() {
        const newUnselectedReactions = [
            ...unselectedReactions,
            ...inputReactions.filter(reaction => !unselectedReactions.some(unselectedR => unselectedR.id === reaction.id))
        ];

        setInputReaction([]);
        setUnselectedReactions(newUnselectedReactions);
        setActiveSelection([]);
        setReselectReaction([]);
    }

    function handleBackButton(){
        setCurrentView("searchPage");
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
                            <th className={styles.headerActivationEnergy}>Activation Energy</th>
                            <th className={styles.headerReactionEnergy}>Reaction Energy</th>
                        </tr>
                    </thead>

                    <tbody>
                        {inputReactions.map((reaction) => (
                            <tr key={reaction.id} className={`${styles.rows} ${reaction.dataSource === "AiScia" ? styles.aiSciaData: ""}`}>
                                <td className={styles.rowSelect}>
                                    <input type="checkbox" 
                                            defaultChecked={true}
                                            onChange={() => handleCheckboxChangeInSelected(reaction)}/>
                                </td>
                                <td className={styles.rowReaction}>{reaction.Equation}</td>
                                <td className={styles.rowSurface}>{reaction.surfaceComposition}</td>
                                <td className={styles.rowActivationEnergy}>
                                    {reaction.activationEnergy ? reaction.activationEnergy.toFixed(2) : `NA`}
                                </td>
                                <td className={styles.rowReactionEnergy}>
                                    {reaction.reactionEnergy ? reaction.reactionEnergy.toFixed(2) : `NA`}
                                </td>
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
                            <th className={styles.headerActivationEnergy}>Activation Energy</th>
                            <th className={styles.headerReactionEnergy}>Reaction Energy</th>
                        </tr>
                    </thead>

                    <tbody>
                        {unselectedReactions.map((reaction) => (
                            <tr key={reaction.id} className={styles.rows}>
                                <td className={styles.rowSelect}>
                                    <input type="checkbox" 
                                            defaultChecked={false}
                                            onChange={() => handleCheckboxChangeInUnselected(reaction)}/>
                                </td>
                                <td className={styles.rowReaction}>{reaction.Equation}</td>
                                <td className={styles.rowSurface}>{reaction.surfaceComposition}</td>
                                <td className={styles.rowActivationEnergy}>
                                    {reaction.activationEnergy ? reaction.activationEnergy.toFixed(2) : `NA`}
                                </td>
                                <td className={styles.rowReactionEnergy}>
                                    {reaction.reactionEnergy ? reaction.reactionEnergy.toFixed(2) : `NA`}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* update table buttons*/}
            <div className={styles.tableButtons}>
                <div>
                    <button onClick={handleUpdateSelection} className={styles.updateButton}>Update Selection</button>
                </div>
                <div>
                    <button onClick={handleClearSelection} className={styles.clearButton}>Clear Selection</button>
                </div>
            </div>

            {/* Other buttons*/}
            <div className={styles.otherButtons}>
                <div>
                    <button onClick={handleBackButton} className={styles.backButton}>&#8592; Back to Search</button>
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