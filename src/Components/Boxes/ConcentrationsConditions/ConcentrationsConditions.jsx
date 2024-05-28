import React, { useState, useEffect} from "react";
import styles from "./ConcentrationsConditions.module.css";

function ConcentrationsConditions(){

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
    
    const [concentrationValues, setConcentrationValues] = useState({
        "C": 0, 
        "O": 0, 
        "*": 1
    });

    const handleInputChange = (key, value) => {
        setConcentrationValues(prevValues => ({
            ...prevValues,
            [key]: parseFloat(value)
        }));
    };

    // State variable to track whether any concentration input is empty
    const [emptyInputWarning, setEmptyInputWarning] = useState(false);

    // Check if any concentration input is empty
    useEffect(() => {
        const hasEmptyInput = Object.values(concentrationValues).some(value => value === '' || isNaN(value));
        setEmptyInputWarning(hasEmptyInput);
    }, [concentrationValues]);

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
                        <button className={styles.runButton}>Run Model</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConcentrationsConditions