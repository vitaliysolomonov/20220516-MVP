import NewEntry from "./NewEntry";
import AllMail from "./AllMail";

import axios from "axios";

import {useEffect, useState} from "react";

const AdminPage = ({setUser}) => {


    const [allEntries, setAllEntries] = useState([]);
    const getAllEntries = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/mail/sorted`);
        setAllEntries(data);
    }
    useEffect(() => {
        getAllEntries();
    }, [])


    return (
        <div className={"adminPage"}>
            <NewEntry allEntries={allEntries} getAllEntries={getAllEntries}/>
            <br/>
            <br/>
            <h3>All mail in the Mail Room</h3>
            <AllMail allEntries={allEntries} getAllEntries={getAllEntries}/>
        </div>
    );
}
export default AdminPage;