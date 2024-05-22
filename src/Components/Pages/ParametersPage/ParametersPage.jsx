import Header from "../../Header/Header";
import SelectedReactionsBox2 from "../../Boxes/SelectedReactionsBox2/SelectedReactionsBox2";
import ConcentrationsConditions from "../../Boxes/ConcentrationsConditions/ConcentrationsConditions";

import Footer from "../../Footer/Footer";

import React from "react";
import Styles from "./ParametersPage.module.css";

function ParametersPage(){
    return(
        <>
            <div className={Styles.page}>
                <Header />
                <div className={Styles.container}>
                    <div className={Styles.selectedBox}>
                        <SelectedReactionsBox2 />
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