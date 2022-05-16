import {useEffect, useState} from "react";
import axios from "axios";
import GroupMailEntry from "./GroupMailEntry";
import TopBar from "./TopBar";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Box from '@mui/material/Box';

const GroupPage = ({user, setUser}) => {

    const [groupMail, setGroupMail] = useState([]);
    const getGroupMail = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/mail/${user.access}`);
        setGroupMail(data);
    };

    useEffect(() => {
        getGroupMail();
    });

    return (

        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    p: 2,
                    pb: 4,
                    width: "100%"

                },
            }}
        >
            <Paper elevation={3}>
                    {groupMail.length > 0 ?
                        <div>
                            <br/>
                            <p>{user.name}, the following <strong>{user.access}</strong> Soldiers have mail:</p>
                            <br/>
                            {/*<table rules={"rows"} className={"list"}>*/}
                            {/*    <thead>*/}
                            {/*    <tr>*/}
                            {/*        <th>Name</th>*/}
                            {/*        <th>Quantity</th>*/}
                            {/*        <th>#Days at Mail Room</th>*/}
                            {/*    </tr>*/}
                            {/*    </thead>*/}
                            {/*    <tbody>*/}
                            {/*    {groupMail.map((entry) => <GroupMailEntry*/}
                            {/*        entry={entry}*/}
                            {/*        key={entry.id}*/}
                            {/*    />)}*/}
                            {/*    </tbody>*/}
                            {/*</table>*/}


                            <TableContainer >
                                <Table sx={{minWidth: 300, maxWidth: 650, mx: "auto"}} size="small"
                                       aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Name</TableCell>
                                            <TableCell align="center">Quantity</TableCell>
                                            <TableCell align="center">#Days at Mail Room</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groupMail.map((entry) => <GroupMailEntry
                                            entry={entry}
                                            key={entry.id}
                                        />)}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </div>
                        :
                        <p><br/>{user.name}, {user.unit} Soldiers do not have mail.</p>
                    }


            </Paper>
        </Box>
    );
}
export default GroupPage;

