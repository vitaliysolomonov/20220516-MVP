import {useState} from "react";
import axios from "axios";
import React from 'react';

const NewEntry = ({allEntries, getAllEntries}) => {

    const [unit, setUnit] = useState('HHC');
    const [name, setName] = useState('');
    const [mailQuantity, setMailQuantity] = useState(1);


    const saveNewEntry = (e) => {
        e.preventDefault();
        if(!name) return;
        let alreadyPatched = false;
        //look through all mail if this person already has some mail
        for (let i = 0; i < allEntries.length; i++) {
            //if this person already has mail, just add (patch) additional mail to this person
            if (allEntries[i].name === name && allEntries[i].unit === unit) {
                axios.patch(`${process.env.REACT_APP_API}/mail/${allEntries[i].id}`,
                    {"mailCount": allEntries[i].mailCount + mailQuantity}).then(getAllEntries);
                alreadyPatched = true;
                break;
            }
        }
        //If this is a new person, then add (post) new mail entry to DB
        if (!alreadyPatched)
            axios.post(`${process.env.REACT_APP_API}/mail`, {
                "name": name,
                "unit": unit,
                "mailCount": mailQuantity
            }).then(getAllEntries);
        setUnit('HHC');
        setName('');
        setMailQuantity(1);
    }


    return (
        <div className={"newEntry"}>
            <h4>Add new mail entry</h4>
            <form onSubmit={(e) => saveNewEntry(e)}>
                <label htmlFor="unit">Select unit: </label>
                <select name="unit"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}>
                    <option value="HHC">HHC</option>
                    <option value="A Co">A Co</option>
                    <option value="B Co">B Co</option>
                    <option value="C Co">C Co</option>
                </select>
                <br/><br/>

                <label htmlFor={"name"}>Soldier's name: </label>
                <input
                    type={"text"}
                    name={"name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <br/><br/>

                <label htmlFor={"mailQuantity"}>Quantity of mail pieces received: </label>
                <input
                    className={"quantity"}
                    type="number"
                    name={"mailQuantity"}
                    min="1" max="100"
                    value={mailQuantity}
                    onChange={(e) => setMailQuantity(Number(e.target.value))}/>&nbsp;&nbsp;

                <input
                    type="submit"
                    value="Submit"
                    onClick={(e) => saveNewEntry(e)}/>
            </form>
        </div>
    )
}
export default NewEntry;