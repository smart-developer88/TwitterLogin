import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";
// import {makeStyles} from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import {post} from "../services/api/apiService";
// import { useHistory } from "react-router-dom";


// const useStyles = makeStyles({
//     table: {
//         minWidth: 650,
//     },
// });

export default function SearchGroups() {
    // const classes = useStyles();
    const [responsive] = useState("vertical");
    const [groups, setGroups] = useState([]);

    const joinGroup = (groupId) => {
        let params = {
            groupId: groupId
        };

        post("/join-group", params)
            .then((response) => {
                console.log(response);
            });

        return <Redirect to='/groups' />
    };

    useEffect(() => {
        fetch("/api/join-group")
            .then(res => res.json())
            .then(
                (result) => {

                    const rows = result.map((result) => {
                        return {
                            name: result.name,
                            owner: result.owner,
                            details: <Button variant="contained"
                                             color="primary"
                                             href={'/group/' + result.id}
                            >
                                View Details
                            </Button>,
                            join: <Button variant="contained"
                                          color="primary"
                                          onClick={() => joinGroup(result.id)}
                            >
                                Join Group
                            </Button>
                        }
                    });

                    setGroups(rows);
                    console.log(result);
                }
            );

    }, []);

    const columns = [
        {
            name: "name",
            label: "Group",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "owner",
            label: "Owner",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "details",
            label: "Group Details",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "join",
            label: "Join Group",
            options: {
                filter: false,
                sort: false,
            }
        },
    ];

    const options = {
        filter: true,
        filterType: "dropdown",
        responsive,
        download: false,
        print: false,
        selectableRows: "none"
    };

    return (
        <MUIDataTable
            title={"Group List"}
            data={groups}
            columns={columns}
            options={options}
        />
    );
}