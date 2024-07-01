import Header from "../../Header/Header";
import SelectedReactionsBox2 from "../../Boxes/SelectedReactionsBox2/SelectedReactionsBox2";
import ConcentrationsConditions from "../../Boxes/ConcentrationsConditions/ConcentrationsConditions";
import EditEnergyValuesBox from "../../Boxes/EditEnergyValuesBox/EditEnergyValuesBox";

import Footer from "../../Footer/Footer";

import React, { useState, createContext, useEffect } from "react";
import Styles from "./ParametersPage.module.css";

export const CurrentBoxContext = createContext(); 

function ParametersPage(){

    const [currentBox, setCurrentBox] = useState("selectBox");

    const ContextValues = {
        currentBox, 
        setCurrentBox
      };

    useEffect(()=>{
        handleBoxView();
    },[currentBox])

    function handleBoxView(){
        if(currentBox == "selectBox"){
            return <SelectedReactionsBox2 />;
        } else if(currentBox == "editBox"){
            return <EditEnergyValuesBox />; 
        }
    }

    return(
        <>
            <div className={Styles.page}>
                <Header />
                <div className={Styles.container}>
                    <div className={Styles.selectedBox}>
                        <CurrentBoxContext.Provider value={ContextValues}>
                            {handleBoxView()}
                        </CurrentBoxContext.Provider>
                    </div>
                    <div className={Styles.conditionsBox}>
                        <ConcentrationsConditions />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default ParametersPage