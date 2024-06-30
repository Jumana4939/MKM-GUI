import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import styles from "./ReactionDetailsPage.module.css"

function ReactionDetailsPage(){
    let {id} = useParams();
    const [reaction, setReaction] = useState(null);

    useEffect(() => {
        const reactionData = localStorage.getItem('reactionData');
        console.log(reactionData);
        if (reactionData) {
          setReaction(JSON.parse(reactionData));
        }
    }, []);
    
    if(!reaction){
        return(
            <>
                <div className={styles.mainContainer}>
                    <Header></Header>
                        <div className={styles.bodyContainer}>
                            <h1>Reaction Details</h1>   
                            <br /><br /><br />
                            <h3>Reaction Details Not Available</h3>                         
                        </div>
                    <Footer></Footer>
                </div>
            </>
        )
    }

    const formattedReaction = JSON.stringify(reaction, null, 2);

    const parsedMolecularData = JSON.parse(reaction.molecularData);
    const dynamicKey = Object.keys(parsedMolecularData)[0];

    return(
    <>
    <div className={styles.mainContainer}>
        <Header></Header>
        <div className={styles.bodyContainer}>
            <h1 className={styles.title}>Reaction Details</h1>
            <br /><br />
            <div className={styles.dataContainer}>
                <div className={styles.dataBox}>
                    <p>Equation: </p>
                    <p>{reaction.Equation}</p>
                </div>
                <div className={styles.dataBox}>
                    <p>ID: </p>
                    <p>{reaction.id}</p>
                </div>
                <div className={styles.dataBox}>
                    <p>Reaction Energy: </p>
                    <p>{reaction.reactionEnergy}</p>
                </div>
                <div className={styles.dataBox}>
                    <p>Activation Energy: </p>
                    <p>{reaction.activationEnergy}</p>
                </div>
                <div className={styles.dataBox}>
                    <p>Surface Composition: </p>
                    <p>{reaction.surfaceComposition}</p>
                </div>
                <div className={styles.dataBox}>
                    <p>Facet: </p>
                    <p>{reaction.facet}</p>
                </div>
                <div className={styles.dataBox}>
                    <p>DFT Code: </p>
                    <p>{reaction.dftCode}</p>
                </div>
                <div className={styles.dataBox}>
                    <p>Molecular Weight: </p>
                    <p>{parsedMolecularData[dynamicKey].molecularWeight}</p>
                </div>
                <div className={styles.dataBox}>
                    <p>Symmetry: </p>
                    <p>{parsedMolecularData[dynamicKey].symmetrySigma}</p>
                </div>
                <div className={styles.dataBox}>
                    <p>Rotational Constant: </p>
                    <p>{parsedMolecularData[dynamicKey].rotationalConstant}</p>
                </div>
                <div className={styles.dataBox}>
                    <p>Data Source: </p>
                    <p>{reaction.dataSource}</p>
                </div>
                <div className={styles.dataBox}>
                    <p>pubID: </p>
                    <p>{reaction.pubId}</p>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
    </>
    );
}

export default ReactionDetailsPage