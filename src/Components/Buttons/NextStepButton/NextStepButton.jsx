import React, { useContext } from 'react';
import styles from './NextStepButton.module.css';

import { CurrentViewContext } from '../../Pages/PageNavigationLogic/PageNavigationLogic';

function NextStepButton(){

    const {
        currentView, 
        setCurrentView
    } = useContext(CurrentViewContext);

    function handleViewChange(){
        setCurrentView("parametersPage");
    }

    return(
        <>
        <button className={styles.button} onClick={handleViewChange}>
            Next Step
        </button>
        </>
    );
}

export default NextStepButton