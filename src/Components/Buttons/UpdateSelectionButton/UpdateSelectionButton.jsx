import styles from './UpdateSelectionButton.module.css'
import { useContext } from 'react';

import { ActiveReactionsContext } from '../../Boxes/SelectedReactionBox/SelectedReactionBox';
import { InputReactionsContext } from '../../../App';

function UpdateSelectionButton(){

    const {
        _, 
        setInputReaction
    } = useContext(InputReactionsContext);

    const {
        activeSelection, 
        setActiveSelection
    } = useContext(ActiveReactionsContext);

    function handleUpdateSelectionClick() {
        setInputReaction(prevCurrentReactions =>
            prevCurrentReactions.filter(reaction =>
                !activeSelection.some(selectedR => selectedR.id === reaction.id)
            )
        );
        setActiveSelection([]);
    }

    return(
        <>
            <button className={styles.button} onClick={handleUpdateSelectionClick}>
                Update Selection
            </button>
        </>
    );
}

export default UpdateSelectionButton