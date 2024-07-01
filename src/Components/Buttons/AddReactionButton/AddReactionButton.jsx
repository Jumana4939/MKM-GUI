import React, {useContext, useEffect} from 'react';
import styles from './AddReactionButton.module.css';
import { ReactionsContext } from '../../Pages/SearchPage/SearchPage';
import { InputReactionsContext } from '../../Pages/PageNavigationLogic/PageNavigationLogic';

function AddReactionButton(){

    const {
        selectedReactions,
        setSelectedReactions, 
        currentReactions, 
        setCurrentReaction
    } = useContext(ReactionsContext);

    const {
        inputReactions, 
        setInputReaction
    } = useContext(InputReactionsContext);

    function handleAddReaction(){

        const uniqueReactions = selectedReactions.filter(reaction => {
            if (inputReactions.some(item => item.id === reaction.id)){
                //console.log(`Dulplicate object with id ${reaction.id} found.`);
                return false; 
            } else {
                return true; 
            }
        });

        setInputReaction(c => [...c, ...uniqueReactions])
        setSelectedReactions(s => []);
    };

    /* useEffect(() => {
        console.log("Current Reactions", inputReactions);
    }, [inputReactions]) */


    return(
        <>
        <button className={styles.button}  onClick={handleAddReaction}>
            {`Add Reaction(s)`}
        </button>
        </>
    );
}

export default AddReactionButton