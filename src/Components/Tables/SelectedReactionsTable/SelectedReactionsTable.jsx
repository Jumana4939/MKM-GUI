import styles from "./SelectedReactionsTable.module.css"
import { useContext, useEffect } from "react";
import { ActiveReactionsContext } from "../../Boxes/SelectedReactionBox/SelectedReactionBox";

function SelectedReactionsTable({data}){

    const {
        activeSelection, 
        setActiveSelection
    } = useContext(ActiveReactionsContext);


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

    useEffect(()=>{
        console.log("ActiveSelection", activeSelection);
    }, [activeSelection])

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
                    {data.map((reaction) => (
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
    );
}

export default SelectedReactionsTable