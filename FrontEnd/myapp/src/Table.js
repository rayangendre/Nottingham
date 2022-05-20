import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getThemeProps } from "@mui/system";
import { Link } from "react-router-dom";

export function currencyFormat(number) {
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
            <TableCell align="right">Current Price</TableCell>
            <TableCell align="right">Total Value</TableCell>
            <TableCell align="right">Percent Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={"/dynamic/" + row.name}>{row.name}</Link>
              </TableCell>
              <TableCell align="right">{row.shares}</TableCell>
              <TableCell align="right">{currencyFormat(row.price)}</TableCell>
              <TableCell align="right">
                {currencyFormat(row.totalValue)}
              </TableCell>
              <TableCell align="right">{row.percent_change}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

//changes to be made here, need to modify flow of data to enable price check
export function WatchlistTable(props) {
  console.log(props.data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stock Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={"/dynamic/" + row.name}>{row.name}</Link>
              </TableCell>
              <TableCell align="right">{currencyFormat(row.price)}</TableCell>
              <TableCell align="right">
                <button
                  onClick={() => props.removeFromWL(row)}
                  type="button"
                  class="btn btn-outline-primary"
                >
                  Remove
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
