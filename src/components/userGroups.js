import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {del} from '../services/api/apiService';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

// function createData(id, name, owner, userCount) {
//     return { id, name, owner, userCount };
// }

// const rows = [
//     createData('101', "ABC Engagement", "@abc123", 24),
//     createData('102', "Data Powered Friends", "@data_powered", 2000),
//     createData('103', "Nikki's!", "@nikki", 500),
// ];

export default function UserGroups() {
    const classes = useStyles();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch("/api/groups")
            .then(res => res.json())
            .then(
            (result) => {
                setGroups(result);
            }
        );

    }, []);

    const deleteGroup = (groupId) => {
        let params = {
            groupId: groupId
        };

        del("/groups", params)
            .then((response) => {
            console.log(response);
            if (response.status === 200) {
                return setGroups(groups.filter((row, j) => row.id !== groupId));
            }
            else {
                return "error";
            }
            });
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Group</TableCell>
                        <TableCell align="center">Owner</TableCell>
                        <TableCell align="center">User Count</TableCell>
                        <TableCell align="center">Details</TableCell>
                        <TableCell align="center">Delete / Leave</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {groups && groups.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.owner}</TableCell>
                            <TableCell align="center">10</TableCell>
                            <TableCell align="center">
                                <Button variant="contained"
                                        color="primary"
                                        href={'/group/' + row.id}
                                >
                                    Select
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button variant="contained"
                                        color="secondary"
                                        onClick={() => deleteGroup(row.id)}
                                >
                                    X
                                </Button>
                            </TableCell>


                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}