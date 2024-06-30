import React, {useContext, useEffect, useState} from "react";
import styles from "./SearchResultsTable.module.css"
import { ReactionsContext } from "../../Pages/SearchPage/SearchPage";
import { DatabaseContext } from "../../Boxes/SearchBox/SearchBox";
import { TableControlsContext } from "../../Boxes/SearchBox/SearchBox";

import { Link } from "react-router-dom";

function SearchResultsTable(){

    //importing data from other components 
    const {
        selectedReactions,
        setSelectedReactions, 
        _, 
        __
    } = useContext(ReactionsContext);

    const {
        reactionsDB, ___
    } = useContext(DatabaseContext);

    const {
        page, setPage,
        totalPages, ____
    } = useContext(TableControlsContext);

    //check box handling, adding selected reactions to list for add reactions buttons to use.
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

    const handlePrevPage = () => {
        if (page > 1){
            setPage(page-1);
        }
    };

    const handleNextPage = () => {
        if(page < totalPages) {
            setPage(page+1);
        }
    };


     // Handle click on reaction equation to open details in new tab
/*     const handleReactionDetails = (reaction) => (e) => {
        e.preventDefault();
        const reactionDetailsUrl = `/reaction-details/${reaction.id}`;
        window.open(reactionDetailsUrl, "_blank");
    }; */

    //HTML structure code
    return(
        <>
        <div className={styles.container}>
        <table className={styles.table}>
            <thead className={styles.headers}>
                <tr>
                    <th className={styles.headerSelect}>Select</th>
                    <th className={styles.headerReaction}>Reaction</th>
                    <th className={styles.headerSurface}>Surface</th>
                    <th className={styles.headerActivationEnergy}>Activation Energy</th>
                    <th className={styles.headerReactionEnergy}>Reaction Energy</th>
                    <th className={styles.headerReactionFacet}>Facet</th>
                </tr>
            </thead>

            <tbody>
                {reactionsDB.map((reaction) => (
                    <tr key={reaction.id} 
                    className={`${styles.rows} ${reaction.dataSource === "AiScia" ? styles.aiSciaData: ""}`}>
                        <td className={styles.rowSelect}><input type="checkbox"
                            onChange={() => handleCheckboxChange(reaction)}
                            checked={selectedReactions.some(selectedR => selectedR.id === reaction.id)}/>
                        </td>
                        <td className={styles.rowReaction}>
                            <Link to={`/reaction-details/${reaction.id}`} state={{reaction: "Hello World"}} 
                            target="_blank" className={styles.reactionLink}>
                                {reaction.Equation}
                            </Link>
                        </td>
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
    
    <div className={styles.controls}>
            <button className={styles.controlsButtons}
                onClick={handlePrevPage} disabled={page === 1}
            >&#8592;</button>

            <span> {page}/{totalPages} </span>

            <button className={styles.controlsButtons}
                onClick={handleNextPage} disabled={page === totalPages}
            >&#8594;</button>
    </div>
    </>
    );
}

export default SearchResultsTable