import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import * as React from "react";


const GroupMailEntry = ({entry}) => {

    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let date = new Date((Number)(entry.date.slice(0, 4)), (Number)(entry.date.slice(5, 7)) - 1, (Number)(entry.date.slice(8)));

    return (
        // <tr>
        //     <td className={"nameColumn"}>{entry.name}</td>
        //     <td>{entry.mailCount}</td>
        //     <td>{(today - date) / 1000 / 3600 / 24}</td>
        // </tr>

    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
        <TableCell component="th" scope="row" align="left" sx={{pl:4}}>{entry.name}</TableCell>
        <TableCell align="center">{entry.mailCount}</TableCell>
        <TableCell align="center">{(today - date) / 1000 / 3600 / 24}</TableCell>
    </TableRow>
    )
}
export default GroupMailEntry;