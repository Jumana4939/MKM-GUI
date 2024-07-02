import React, {useContext} from 'react';
import styles from './ClearSelectionButton.module.css';

import { InputReactionsContext } from '../../Pages/PageNavigationLogic/PageNavigationLogic';
import { ActiveReactionsContext } from '../../Boxes/SelectedReactionBox/SelectedReactionBox';

function ClearSelectionButton(){

    const {
        _, 
        setInputReaction
    } = useContext(InputReactionsContext);

    const {
        ____, 
        setActiveSelection
    } = useContext(ActiveReactionsContext);

    function handleClearReactions(){
        setInputReaction([]);
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