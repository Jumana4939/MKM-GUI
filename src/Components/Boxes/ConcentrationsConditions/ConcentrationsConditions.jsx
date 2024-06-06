import React, { useState, useEffect, useContext} from "react";
import styles from "./ConcentrationsConditions.module.css";

import { InputReactionsContext } from "../../../App";

function ConcentrationsConditions(){

    const {
        inputReactions, 
        _
    } = useContext(InputReactionsContext);

    //simulation conditions values
    const defaultConditionValues = {
        "temperatureMin": 300,
        "temperatureMax": 900,
        "pressure": 1,
        "duration": 10,
        "durationExponent": 5,
        "absoluteTolerance": 1,
        "absoluteToleranceExponent": -8,
        "relativeTolerance": 1,
        "relativeToleranceExponent": -8
    };

    const [temperatureMin, setTemperatureMin] = useState(defaultConditionValues["temperatureMin"]);
    const [temperatureMax, setTemperatureMax] = useState(defaultConditionValues["temperatureMax"]);
    const [pressure, setPressure] = useState(defaultConditionValues["pressure"]);
    const [duration, setDuration] = useState(defaultConditionValues["duration"]);
    const [durationExponent, setDurationExponent] = useState(defaultConditionValues["durationExponent"]);
    const [absoluteTolerance, setAbsoluteTolerance] = useState(defaultConditionValues["absoluteTolerance"]);
    const [absoluteToleranceExponent, setAbsoluteToleranceExponent] = useState(defaultConditionValues["absoluteToleranceExponent"]);
    const [relativeTolerance, setRelativeTolerance] = useState(defaultConditionValues["relativeTolerance"]);
    const [relativeToleranceExponent, setRelativeToleranceExponent] = useState(defaultConditionValues["relativeToleranceExponent"]);

    function handleResetButton(){
        // resetting simulation condition values to defaults
        setTemperatureMin(defaultConditionValues["temperatureMin"]);
        setTemperatureMax(defaultConditionValues["temperatureMax"]);
        setPressure(defaultConditionValues["pressure"]);
        setDuration(defaultConditionValues["duration"]);
        setDurationExponent(defaultConditionValues["durationExponent"]);
        setAbsoluteTolerance(defaultConditionValues["absoluteTolerance"]);
        setAbsoluteToleranceExponent(defaultConditionValues["absoluteToleranceExponent"]);
        setRelativeTolerance(defaultConditionValues["relativeTolerance"]);
        setRelativeToleranceExponent(defaultConditionValues["relativeToleranceExponent"]);
    }
    
    const [concentrationValues, setConcentrationValues] = useState({});

    function concentrationKeyGeneration(){
        //extract reaction equations
        const reactionEquations = []; 
        inputReactions.forEach(reaction => {
            reactionEquations.push(formatEquation(reaction['Equation']))
        });

        console.log("equations: ", reactionEquations);

        const uniqueConcentractions = new Set();

        // Regular expression to match text between curly braces
        const pattern = /\{(.*?)\}/g;

        reactionEquations.forEach(equation => {
            let matches;
            while ((matches = pattern.exec(equation)) != null) {
                console.log("INSIDE WHILE LOOP");
                uniqueConcentractions.add(matches[1]);
            }
        });

        console.log("uniqueConcentractions: ", uniqueConcentractions);

        // ADD CODE HERE
        const newConcentrationValues = {};

        // Set values to 0 for new keys, retain old values for existing keys
        uniqueConcentractions.forEach(key => {
            newConcentrationValues[key] = concentrationValues[key] || 0; 
        });

        // Update the state with the new concentration values
        setConcentrationValues(newConcentrationValues);
    }

    function formatEquation(eq){
        // Remove substring (g) which means gas from the equation
        eq = eq.replace("(g)", "");

        // Split the input string into reactants and products
        let [reactants, products] = eq.split("->").map(str => str.trim());

        // Process reactants
        let [processedReactants, reactantSeparators] = processSide(reactants);

        // Process products
        let [processedProducts, productSeparators] = processSide(products);

        // Join the parts to form the converted reaction
        let convertedReaction = "";
        processedReactants.forEach((reactant, i) => {
            convertedReaction += reactant + " ";
            if (i < reactantSeparators.length) {
                convertedReaction += reactantSeparators[i] + " ";
            }
        });

        convertedReaction += " => ";
        processedProducts.forEach((product, i) => {
            convertedReaction += product + " ";
            if (i < productSeparators.length) {
                convertedReaction += productSeparators[i] + " ";
            }
        });

        // Removing surface with 0 coefficients
        convertedReaction = convertedReaction.replace(/ \+ 0\{\*\} /g, "");
        convertedReaction = convertedReaction.replace(/ - 0\{\*\} /g, "");

        return convertedReaction;
    }


    /* Helper function for "formatEquation" function */
    function processSide(side) {
        // Split the side using both '+' and '-'
        let speciesList = side.split(/\s*[\+-]\s*/);

        // Determine the separators used
        let separators = side.match(/[\+-]/g);
        if(!separators){
            separators = []
        }

        // Process each species
        let processedSpecies = speciesList.map(processSpecies);

        return [processedSpecies, separators];
    }

    /* Helper function for "processSide" function */
    function processSpecies(species) {
        // Extract the coefficient and species
        let match = species.trim().match(/^([-+]?\d*)(.*)/);
        let [, coefficient, molecule] = match;

        // Format the species with curly braces
        let formattedSpecies = (coefficient ? coefficient : "") + "{" + molecule.trim() + "}";

        return formattedSpecies;
    }

    // Update concentration keys every time list of reaction to be used is updated
    useEffect(() => {
        console.log("Helloooo")
        concentrationKeyGeneration();
        console.log("Bye")
    }, [inputReactions]);

    const handleInputChange = (key, value) => {
        setConcentrationValues(prevValues => ({
            ...prevValues,
            [key]: value.toString()
        }));
    };

    // State variable to track whether any concentration input is empty
    const [emptyInputWarning, setEmptyInputWarning] = useState(false);

    // Check if any concentration input is empty
    useEffect(() => {
        const hasEmptyInput = Object.values(concentrationValues).some(value => value === '' || isNaN(value));
        setEmptyInputWarning(hasEmptyInput);
    }, [concentrationValues]);

    function createUserInput(){
        const userInputs = {"initial_concentrations":concentrationValues,
        "reactions_data":inputReactions,
        "initial_conditions":{"min_temperature": temperatureMin, 
            "max_temperature": temperatureMax, 
            "time": `${duration}e${durationExponent}`, 
            "atol": `${absoluteTolerance}e${absoluteToleranceExponent}`, 
            "rtol": `${relativeTolerance}e${relativeToleranceExponent}`
        },
        "pressure": pressure.toString()};

        console.log("userInputs:",userInputs);
        return(userInputs);
    }

    // Connect to backend to generate Input_SAC.mkm file and download
    const handleGenerateFileButton = async () => {
        const userInputs = createUserInput();

        try {
            const response = await fetch('http://127.0.0.1:5000/generate-input-file', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userInputs),
            });
        
            if (response.ok) {
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'Input_SAC.mkm';
              document.body.appendChild(a);
              a.click();
              a.remove();
            } else {
              console.error('Failed to generate file', response.statusText);
            }
          } catch (error) {
            console.error('Error:', error);
        }
    };

    return(
        <>
            <div className={styles.container}>
                <div className={styles.concentrationsContainer}>
                    <div>
                    <h2 className={styles.concentrationsTitle}>Initial Concentrations</h2>
                    </div>
                    <div className={styles.concentrationsBoxInputs}>
                        {
                            Object.entries(concentrationValues).map(([key, v]) => 
                            <div key={key} className={styles.concentrationPair}>
                            <label className={styles.concentrationLabel} htmlFor="">{key}</label>
                            <input className={styles.concentrationInput} type="number"
                            step="0.01" value={v} placeholder="0 - 1"
                            onChange={(e) => handleInputChange(key, e.target.value)}/>
                        </div>
                        )}
                    </div>
                    {emptyInputWarning && 
                        <div>
                            <p className={styles.warningMessage}>*Please fill in all concentration values.</p>
                        </div>
                    }
                </div>

                {/* Simulation Conditions Input*/}
                <div className={styles.conditionsContainer}>
                    <div>
                    <h2 className={styles.conditionsTitle}>Simulation Conditions</h2>
                    </div>
                    <div className={styles.inputsBox}>
                        {/* Temperature Inputs*/}
                        <div className={styles.conditionsRow}>
                            <label className={styles.conditionLabel} htmlFor="">Temperature:</label>
                            <input className={styles.conditionInput} type="number" value={temperatureMin}
                            onChange={(e) => setTemperatureMin(e.target.value)}/>
                            <label className={styles.conditionPrefix} htmlFor="">to</label>
                            <input className={styles.conditionInput} type="number" value={temperatureMax}
                            onChange={(e) => setTemperatureMax(e.target.value)}/>
                        </div>
                        {/* Pressure Inputs*/}
                        <div className={styles.conditionsRow}>
                            <label className={styles.conditionLabel} htmlFor="">Pressure:</label>
                            <input className={styles.conditionInput} type="number" value={pressure}
                            onChange={(e) => setPressure(e.target.value)}/>
                        </div>
                        {/* Duration Inputs*/}
                        <div className={styles.conditionsRow}>
                            <label className={styles.conditionLabel} htmlFor="">Duration:</label>
                            <input className={styles.conditionInput} type="number" value={duration}
                            onChange={(e) => setDuration(e.target.value)}/>
                            <label className={styles.conditionPrefix} htmlFor="">x10^</label>
                            <input className={styles.conditionInput} type="number" value={durationExponent}
                            onChange={(e) => setDurationExponent(e.target.value)}/>
                        </div>
                        {/* Absolute Tolerance Inputs*/}
                        <div className={styles.conditionsRow}>
                            <label className={styles.conditionLabel} htmlFor="">Absolute Tolerance:</label>
                            <input className={styles.conditionInput} type="number" value={absoluteTolerance}
                            onChange={(e) => setAbsoluteTolerance(e.target.value)}/>
                            <label className={styles.conditionPrefix} htmlFor="">x10^</label>
                            <input className={styles.conditionInput} type="number" value={absoluteToleranceExponent}
                            onChange={(e) => setAbsoluteToleranceExponent(e.target.value)}/>
                        </div>
                        {/* Relative Tolerance Inputs*/}
                        <div className={styles.conditionsRow}>
                            <label className={styles.conditionLabel} htmlFor="">Relative Tolerance:</label>
                            <input className={styles.conditionInput} type="number" value={relativeTolerance}
                            onChange={(e) => setRelativeTolerance(e.target.value)}/>
                            <label className={styles.conditionPrefix} htmlFor="">x10^</label>
                            <input className={styles.conditionInput} type="number" value={relativeToleranceExponent}
                            onChange={(e) => setRelativeToleranceExponent(e.target.value)}/>
                        </div>

                    </div>
                </div>

                <div className={styles.buttonsContainer}>
                    <div>
                        <button className={styles.resetButton} onClick={handleResetButton}>Reset</button>
                    </div>
                    <div>
                        <button className={styles.runButton} onClick={handleGenerateFileButton}>Generate File</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConcentrationsConditions