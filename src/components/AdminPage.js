import NewEntry from "./NewEntry";
import AllMail from "./AllMail";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    mb:0,
                    p:2,
                    pb: 4,
                    width: "100%"
                },
            }}
        >
            <Paper elevation={3} >

            <NewEntry allEntries={allEntries} getAllEntries={getAllEntries}/>
            </Paper>
            <Paper elevation={3} >
            <h3>All mail in the Mail Room</h3>
            <AllMail allEntries={allEntries} getAllEntries={getAllEntries}/>
        </Paper>
            </Box>
    );
}
export default AdminPage;