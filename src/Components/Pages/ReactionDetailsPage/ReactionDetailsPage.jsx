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
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <td className={styles.label}>Equation: </td>
                            <td className={styles.data}>{reaction.Equation}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>ID: </td>
                            <td className={styles.data}>{reaction.id}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>Reaction Energy: </td>
                            <td className={styles.data}>
                                {reaction.reactionEnergy ? reaction.reactionEnergy.toFixed(2) + " eV" : `N/A`}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>Activation Energy: </td>
                            <td className={styles.data}>
                                {reaction.activationEnergy ? reaction.activationEnergy.toFixed(2) + " eV" : `N/A`}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.label}>Surface Composition: </td>
                            <td className={styles.data}>{reaction.surfaceComposition}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>Facet: </td>
                            <td className={styles.data}>{reaction.facet}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>DFT Code: </td>
                            <td className={styles.data}>{reaction.dftCode}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>Molecular Weight: </td>
                            <td className={styles.data}>{parsedMolecularData[dynamicKey].molecularWeight}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>Symmetry: </td>
                            <td className={styles.data}>{parsedMolecularData[dynamicKey].symmetrySigma}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>Rotational Constant: </td>
                            <td className={styles.data}>{parsedMolecularData[dynamicKey].rotationalConstant}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>Data Source: </td>
                            <td className={styles.data}>{reaction.dataSource}</td>
                        </tr>
                        <tr>
                            <td className={styles.label}>pubID: </td>
                            <td className={styles.data}>{reaction.pubId}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <Footer></Footer>
    </div>
    </>
    );
}

export default ReactionDetailsPage