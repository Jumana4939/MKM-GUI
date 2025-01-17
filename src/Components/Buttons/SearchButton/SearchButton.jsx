import React, {useContext, useEffect, useState} from 'react';
import styles from './SearchButton.module.css';

import { DatabaseContext } from '../../Boxes/SearchBox/SearchBox';
import { UserParametersContext } from '../../Boxes/SearchInputBox/SearchInputBox';
import { TableControlsContext } from '../../Boxes/SearchBox/SearchBox';

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

    const {
        page, setPage,
        totalPages, setTotalPages
    } = useContext(TableControlsContext);
    
    // storing query results parameters for nativagtion of table pages 
    const [resultsReactant, setResultsReactant] = useState("");
    const [resultsProduct, setResultsProduct] = useState("");
    const [resultsSurface, setResultsSurface] = useState("");
    const [resultsFacet, setResultsFacet] = useState("");

    // HANDLE FETCHING DATA FROM BACKEND 
    //Fetch basic data on first mount 
    useEffect(() => {
        // fetch data from backend API when the component first mounts/renders
        queryData();
    }, []);

    useEffect(() => {
        queryDataPageChange();
    }, [page]);

/*     useEffect(() => {
        console.log("ReactionDB: ", reactionsDB);
    }, [reactionsDB]) */

    const queryData = async () => {
        try {
            const queryParams = new URLSearchParams({
                reactants: reactant.replace("*","star"),
                products: product.replace("*","star"),
                surfaces: surface,
                facets: facet,
                page: page
            });
    
            const response = await fetch(`http://127.0.0.1:5000/query?${queryParams}`);
            if(!response.ok) {
                throw new Error(`Network response was not ok`);
            }
    
            const jsonData = await response.json();
            setReactionsDB(jsonData);

            // Fetch the total count
            const totalCountResponse = await fetch(`http://127.0.0.1:5000/total-count?${queryParams}`);
            if (!totalCountResponse.ok) {
                throw new Error(`Network response was not ok`);
            }

            const totalCountJson = await totalCountResponse.json();
            const totalCount = totalCountJson.totalCount;
            //console.log("TOTAL COUNT: ", totalCount);

            // Calculate total pages based on total items and pagination limit
            const totalPages = Math.ceil(totalCount / 50);
            setTotalPages(totalPages);
        } catch (error) {
            console.error(`Error fetching data: `, error);
        }
    };

    const queryDataPageChange = async () => {
        try {
            const queryParams = new URLSearchParams({
                reactants: resultsReactant,
                products: resultsProduct,
                surfaces: resultsSurface,
                facets: resultsFacet,
                page: page
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
        if((reactant || product || surface || facet) || 
        (resultsReactant || resultsProduct || resultsSurface || resultsFacet)){
            //Fetched queried data from backend
            queryData();

            // Store quary paramets
            setResultsReactant(reactant);
            setResultsProduct(product);
            setResultsSurface(surface);
            setResultsFacet(facet);

            // Reset inputs
            /* setReactant("");
            setProduct("");
            setSurface("");
            setFacet(""); */

            //Reset page number
            setPage(1);
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