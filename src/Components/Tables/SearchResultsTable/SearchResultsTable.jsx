import React, {useContext, useEffect, useState} from "react";
import styles from "./SearchResultsTable.module.css"
import { ReactionsContext } from "../../Pages/SearchPage/SearchPage";

function SearchResultsTable({data}){

    //const [selectedReactions, setSelectedReactions] = useState([]);
    const {
        selectedReactions,
        setSelectedReactions, 
        _, 
        __
    } = useContext(ReactionsContext);

    function handleCheckboxChange(reaction){
        //check if the reaction is already selected
        const isSelected = selectedReactions.some(selectedR => selectedR.id === reaction.id);

        if(isSelected){
            //if its already selected, remove it from the list
            setSelectedReactions(prevSelectedReactions => prevSelectedReactions.filter(selectedR => selectedR.id !== reaction.id));
        } else {
            setSelectedReactions(prevSelectedReactions => [...prevSelectedReactions, reaction]);
        }

    }

    return(
        <div className={styles.container}>
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
                {data.map((reaction) => (
                    <tr key={reaction.id} className={styles.rows}>
                        <td className={styles.rowSelect}><input type="checkbox"
                            onChange={() => handleCheckboxChange(reaction)}
                            checked={selectedReactions.some(selectedR => selectedR.id === reaction.id)}/>
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
    );
}

export default SearchResultsTable