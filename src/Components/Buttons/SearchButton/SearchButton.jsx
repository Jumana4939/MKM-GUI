import React, {useContext} from 'react';
import styles from './SearchButton.module.css';

function SearchButton(){

    return(
        <>
        <button className={styles.button}>
            Search
        </button>
        </>
    );
}

export default SearchButton