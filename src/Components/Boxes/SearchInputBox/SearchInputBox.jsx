import { useState } from "react";
import SearchButton from "../../Buttons/SearchButton/SearchButton";

import styles from "./SearchInputBox.module.css"

function SearchInputBox(){

    const [reactant, setReactant] = useState();
    const [product, setProduct] = useState();
    const [surface, setSurface] = useState();
    const [facet, setFacet] = useState();

    return(
        <div className={styles.container}>   
            <div className={styles.inputs}>

                <div className={styles.box}>
                    <div className={styles.input}>
                        <h2>Reactants</h2>
                        <input className={styles.inputbox} type="text" placeholder="H"/>
                    </div>
                </div>


                <div className={`${styles.arrow} ${styles.box}`}>
                    <p>&rarr;</p>
                </div>

                <div className={styles.box}>
                    <div className={styles.input}>
                        <h2>Product</h2>
                        <input className={styles.inputbox} type="text" placeholder="CO*"/>
                    </div>
                </div>

                <div className={styles.box}>
                    <div className={styles.input}>
                        <h2>Surface</h2>
                        <input className={styles.inputbox} type="text" placeholder="Sn"/>
                    </div>
                </div>

                <div className={styles.box}>
                    <div className={styles.input}>
                        <h2>Facet</h2>
                        <input className={styles.inputbox} type="text" placeholder="H"/>
                    </div>
                </div>


            </div>

            <div className={styles.button}>
                <SearchButton/>
            </div>
        </div>
    );
}

export default SearchInputBox