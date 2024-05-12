import React, {useContext, useEffect} from 'react';
import styles from './AddReactionButton.module.css';
import { ReactionsContext } from '../../Pages/SearchPage/SearchPage';

function AddReactionButton(){

    const {
        selectedReactions,
        setSelectedReactions, 
        currentReactions, 
        setCurrentReaction
    } = useContext(ReactionsContext);

    function handleAddReaction(){

        const uniqueReactions = selectedReactions.filter(reaction => {
            if (currentReactions.some(item => item.id === reaction.id)){
                console.log(`Dulplicate object with id ${reaction.id} found.`);
                return false; 
            } else {
                return true; 
            }
        });

        setCurrentReaction(c => [...c, ...uniqueReactions])
        setSelectedReactions(s => []);
    };

    useEffect(() => {
        console.log("Current Reactions", currentReactions);
    }, [currentReactions])


    return(
        <>
        <button className={styles.button}  onClick={handleAddReaction}>
            {`Add Reaction(s)`}
        </button>
        </>
    );
}

export default AddReactionButton