import axios from "axios";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const MailEntry = ({entry, getAllEntries}) => {

    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let date = new Date((Number)(entry.date.slice(0, 4)), (Number)(entry.date.slice(5, 7)) - 1, (Number)(entry.date.slice(8)));
    console.log("today: " + today);
    console.log("date: " + date);
    const handleQuantityChange = async (quantity) => {
        await axios.patch(`${process.env.REACT_APP_API}/mail/${entry.id}`,
            {"mailCount": Number(quantity)});
        getAllEntries();
    }

    const deleteEntry = async () => {
        await axios.delete(`${process.env.REACT_APP_API}/mail/${entry.id}`)
            .then(getAllEntries);
    }

    return (
        // <tr>
        //     <td>{entry.unit}</td>
        //     <td>{entry.name}</td>
        //     <td>
        //         <input
        //             className={"quantity"}
        //             type={"number"}
        //             min={1}
        //             max={100}
        //             value={entry.mailCount}
        //             onChange={(e) => handleQuantityChange(e.target.value)}/>
        //     </td>
        //     <td>{(today - date) / 1000 / 3600 / 24}</td>
        //     <td>
        //         <button
        //             className={"delete"}
        //             onClick={deleteEntry}>
        //             <strong>X</strong>
        //         </button>
        //     </td>
        // </tr>

        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell component="th" scope="row" align="center">{entry.unit}</TableCell>
            <TableCell align="left" sx={{pl:4}}>{entry.name}</TableCell>
            <TableCell align="center">
                <input
                    className={"quantity"}
                    type={"number"}
                    min={1}
                    max={100}
                    value={entry.mailCount}
                    onChange={(e) => handleQuantityChange(e.target.value)}/>
            </TableCell>
            <TableCell align="center">{(today - date) / 1000 / 3600 / 24}</TableCell>
            <TableCell align="center">
                <button
                    className={"delete"}
                    onClick={deleteEntry}>
                    <strong>X</strong>
                </button>
            </TableCell>
        </TableRow>
    );
}
export default MailEntry;

