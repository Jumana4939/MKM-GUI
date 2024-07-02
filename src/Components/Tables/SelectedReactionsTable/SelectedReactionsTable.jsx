import styles from "./SelectedReactionsTable.module.css"
import { useContext, useEffect } from "react";
import { ActiveReactionsContext } from "../../Boxes/SelectedReactionBox/SelectedReactionBox";
import { InputReactionsContext } from "../../Pages/PageNavigationLogic/PageNavigationLogic";

import { Link } from "react-router-dom";

function SelectedReactionsTable(){

    const {
        activeSelection, 
        setActiveSelection
    } = useContext(ActiveReactionsContext);

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

/*     useEffect(()=>{
        console.log("ActiveSelection", activeSelection);
    }, [activeSelection]) */

    // Handle click on reaction equation to open details in new tab
    const handleLinkClick = (event, reaction) => {
        // Check if the middle mouse button or right mouse button was pressed
        if (event.button === 0 || event.button === 1) {
            localStorage.setItem(reaction.id.toString(), JSON.stringify(reaction));
        }
    };

    return(
        <div className={styles.container}>
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
                        <tr key={reaction.id} className={`${styles.rows} ${reaction.dataSource === "AiScia" ? styles.aiSciaData: ""}`}>
                            <td className={styles.rowSelect}>
                                <input type="checkbox" 
                                        defaultChecked={true}
                                        onChange={() => handleCheckboxChange(reaction)}/>
                            </td>
                            <td className={styles.rowReaction}>
                                <Link to={`/reaction-details/${reaction.id}`} onMouseDown={(e) => handleLinkClick(e, reaction)}
                                target="_blank" className={styles.reactionLink}>
                                    {reaction.Equation}
                                </Link>
                            </td>
                            <td className={styles.rowSurface}>{reaction.surfaceComposition}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SelectedReactionsTable