import SearchInputBox from "../SearchInputBox/SearchInputBox";
import AddReactionButton from "../../Buttons/AddReactionButton/AddReactionButton";
import SearchResultsTable from "../../Tables/SearchResultsTable/SearchResultsTable";
import React, {useState, useEffect} from "react";

import styles from './SearchBox.module.css'

function SearchBox(){

    const dB = [
        { id: "1236547896542", reaction: "CI -> O2", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "987654321", reaction: "CI -> O2 + C + H", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "12365963", reaction: "CI -> O2 + I", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "236574129", reaction: "CI -> O2", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "98546325", reaction: "CI -> O2", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },

        { id: "1", reaction: "CI -> O2", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "2", reaction: "CI -> O2 + C + H", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "3", reaction: "CI -> O2 + I", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "4", reaction: "CI -> O2", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "5", reaction: "CI -> O2", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "6", reaction: "CI -> O2", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "7", reaction: "CI -> O2 + C + H", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "8", reaction: "CI -> O2 + I", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "9", reaction: "CI -> O2", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "11", reaction: "CI -> O2", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "12", reaction: "CI -> O2", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "13", reaction: "CI -> O2 + C + H", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "14", reaction: "CI -> O2 + I", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "15", reaction: "CI -> O2", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },
        { id: "16", reaction: "CI -> O2", surface: "Iron", activationEnergy: 0, reactionEnergy: 0 },

      ];

    const [reactionsDB, setReactionsDB] = useState([]);

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

    return(
        <div className={styles.container}>
            <div className={styles.searchInput}>
                <SearchInputBox/>
            </div>

            <div className={styles.table}>
                <SearchResultsTable data={reactionsDB}/>
            </div>

            <div className={styles.addReactions}>
                <br /><br /><br />
                <AddReactionButton/>
            </div>

        </div>
    );
}

export default SearchBox