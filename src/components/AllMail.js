import MailEntry from "./MailEntry";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AllMail = ({allEntries, getAllEntries}) => {
    return (
        // <table rules={"rows"} className={"list"}>
        //     <thead>
        //     <tr >
        //         <th>Unit</th>
        //         <th>Name</th>
        //         <th>Quantity (Edit)</th>
        //         <th>#Days at Mail Room</th>
        //         <th>Picked Up</th>
        //     </tr>
        //     </thead>
        //     <tbody>

        <TableContainer >
            <Table sx={{minWidth: 450, maxWidth:800, mx: "auto"}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Unit</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Quantity (Edit)</TableCell>
                        <TableCell align="center">#Days at Mail Room</TableCell>
                        <TableCell align="center">Picked Up</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allEntries.map((entry) => <MailEntry
                        entry={entry}
                        key={entry.id}
                        getAllEntries={getAllEntries}
                    />)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default AllMail;