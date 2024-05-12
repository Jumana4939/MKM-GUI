import styles from './UpdateSelectionButton.module.css'
import { useContext } from 'react';

import { ReactionsContext } from '../../Pages/SearchPage/SearchPage';
import { ActiveReactionsContext } from '../../Boxes/SelectedReactionBox/SelectedReactionBox';

function UpdateSelectionButton(){

    const {
        _,
        __, 
        ___, 
        setCurrentReaction
    } = useContext(ReactionsContext);

    const {
        activeSelection, 
        setActiveSelection
    } = useContext(ActiveReactionsContext);

    function handleUpdateSelectionClick() {
        setCurrentReaction(prevCurrentReactions =>
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