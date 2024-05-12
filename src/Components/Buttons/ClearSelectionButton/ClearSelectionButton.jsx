import React, {useContext} from 'react';
import styles from './ClearSelectionButton.module.css';

import { ReactionsContext } from '../../Pages/SearchPage/SearchPage';
import { ActiveReactionsContext } from '../../Boxes/SelectedReactionBox/SelectedReactionBox';

function ClearSelectionButton(){

    const {
        _,
        __, 
        ___, 
        setCurrentReaction
    } = useContext(ReactionsContext);

    const {
        ____, 
        setActiveSelection
    } = useContext(ActiveReactionsContext);

    function handleClearReactions(){
        setCurrentReaction([]);
        setActiveSelection([]);
    }

    return(
        <>
        <button className={styles.button} onClick={handleClearReactions}>
            Clear Selection
        </button>
        </>
    );
}

export default ClearSelectionButton