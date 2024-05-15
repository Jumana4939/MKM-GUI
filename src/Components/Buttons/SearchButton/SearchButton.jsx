import React, {useContext, useEffect} from 'react';
import styles from './SearchButton.module.css';

import { DatabaseContext } from '../../Boxes/SearchBox/SearchBox';
import { UserParametersContext } from '../../Boxes/SearchInputBox/SearchInputBox';

function SearchButton(){

    //import database context to update the database based on user search parameters
    //need to use context so other components can access the database
    const {
        reactionsDB, setReactionsDB
    } = useContext(DatabaseContext);

    const {
        reactant, setReactant,
        product, setProduct, 
        surface, setSurface,
        facet, setFacet
    } = useContext(UserParametersContext);

    // HANDLE FETCHING DATA FROM BACKEND 
    //Fetch basic data on first mount 
    useEffect(() => {
        // fetch data from backend API when the component first mounts/renders
        fetchData();
    }, []);

    useEffect(() => {
        console.log("ReactionDB: ", reactionsDB);
    }, [reactionsDB])

    const fetchData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/data`);
            if(!response.ok) {
                throw new Error(`Network response was not ok`);
            }

            const jsonData = await response.json();
            setReactionsDB(jsonData);
        } catch (error) {
            console.error(`Error fetching data: `, error);
        }
    };

    const queryData = async () => {
        try {
            const queryParams = new URLSearchParams({
                reactants: reactant,
                products: product,
                surfaces: surface,
                facets: facet
            });
    
            const response = await fetch(`http://127.0.0.1:5000/query?${queryParams}`);
            if(!response.ok) {
                throw new Error(`Network response was not ok`);
            }
    
            const jsonData = await response.json();
            setReactionsDB(jsonData);
        } catch (error) {
            console.error(`Error fetching data: `, error);
        }
    };

    function handleSearchClick(){
        //only if inputs are NOT empty
        if(reactant || product || surface || facet){
            //Fetched queried data from backend
            queryData();

            // Reset inputs
            setReactant("");
            setProduct("");
            setSurface("");
            setFacet("");
        }
    };

    return(
        <>
        <button className={styles.button} onClick={handleSearchClick}>
            Search
        </button>
        </>
    );
}

export default SearchButton