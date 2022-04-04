import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function currencyFormat(number)
{
    return "$ " + number.toFixed(2);
}

export default function BasicTable(data) {
    console.log("Graphing data: " + JSON.stringify(data));
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Stock Name</TableCell>
                <TableCell align="right">Number Of Shares</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total Value</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.shares}</TableCell>
                <TableCell align="right">{currencyFormat(row.price)}</TableCell>
                <TableCell align="right">{currencyFormat(row.totalValue)}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

//changes to be made here, need to modify flow of data to enable price check
export function WatchlistTable(data) {
    console.log(data);
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Stock Name</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((row) => (
                <TableRow
                key={row}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row}
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
