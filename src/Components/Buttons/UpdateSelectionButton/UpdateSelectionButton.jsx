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
        ____
    } = useContext(ActiveReactionsContext);

    function handleUpdateSelectionClick(){
        setCurrentReaction(activeSelection);
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