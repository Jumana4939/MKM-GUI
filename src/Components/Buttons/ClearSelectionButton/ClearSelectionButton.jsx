import React, {useContext} from 'react';
import styles from './ClearSelectionButton.module.css';

import { ReactionsContext } from '../../Pages/SearchPage/SearchPage';

function ClearSelectionButton(){

    const {
        _,
        __, 
        ___, 
        setCurrentReaction
    } = useContext(ReactionsContext);

    function handleClearReactions(){
        setCurrentReaction([]);
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