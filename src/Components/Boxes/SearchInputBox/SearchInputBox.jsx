import { useState, useContext, useEffect, createContext} from "react";
import SearchButton from "../../Buttons/SearchButton/SearchButton";

import styles from "./SearchInputBox.module.css"

export const UserParametersContext = createContext();

function SearchInputBox(){

    // user input paramters
    const [reactant, setReactant] = useState("");
    const [product, setProduct] = useState("");
    const [surface, setSurface] = useState("");
    const [facet, setFacet] = useState("");

    const contextValues = {
        reactant, setReactant,
        product, setProduct, 
        surface, setSurface,
        facet, setFacet
    };

    function handleReactantChaneg(event){
        setReactant(event.target.value);
    }

    function handleProductChange(event){
        setProduct(event.target.value);
    }

    function handleSurfaceChange(event){
        setSurface(event.target.value);
    }

    function handleFacetChange(event){ 
        setFacet(event.target.value);
    }

    //HTML structure code
    return(
        <div className={styles.container}>   
            <div className={styles.inputs}>

                <div className={styles.box}>
                    <div className={styles.input}>
                        <h2>Reactants</h2>
                        <input className={styles.inputbox} type="text" placeholder="e.g H" 
                        value={reactant} onChange={handleReactantChaneg}/>
                    </div>
                </div>


                <div className={`${styles.arrow} ${styles.box}`}>
                    <p>&rarr;</p>
                </div>

                <div className={styles.box}>
                    <div className={styles.input}>
                        <h2>Product</h2>
                        <input className={styles.inputbox} type="text" placeholder="e.g CO*"
                        value={product} onChange={handleProductChange}/>
                    </div>
                </div>

                <div className={styles.box}>
                    <div className={styles.input}>
                        <h2>Surface</h2>
                        <input className={styles.inputbox} type="text" placeholder="e.g Sn"
                        value={surface} onChange={handleSurfaceChange}/>
                    </div>
                </div>

                <div className={styles.box}>
                    <div className={styles.input}>
                        <h2>Facet</h2>
                        <input className={styles.inputbox} type="text" placeholder="e.g 111"
                        value={facet} onChange={handleFacetChange}/>
                    </div>
                </div>

            </div>

            <UserParametersContext.Provider value={contextValues}>
                <div className={styles.button}>
                    <SearchButton/>
                </div>
            </UserParametersContext.Provider>
        </div>
    );
}

export default SearchInputBox