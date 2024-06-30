import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import styles from "./ReactionDetailsPage.module.css"

function ReactionDetailsPage(){
    let {id} = useParams();
    let location = useLocation();
    //let {reaction} = location.state;

    useEffect(()=>{
        console.log("location: ",location);
        //console.log("reaction: ",reaction);
    },[]);

    //const formattedReaction = JSON.stringify(reaction, null, 2); <pre>{formattedReaction}</pre>

    return(
    <>
    <div className={styles.mainContainer}>
        <Header></Header>
        <div className={styles.bodyContainer}>
            <h2>Reaction Details</h2>
            <p>Showing details for reaction with ID: {id}</p>
            <br /><br /><br />
            
        </div>
        <Footer></Footer>
    </div>
    </>
    );
}

export default ReactionDetailsPage