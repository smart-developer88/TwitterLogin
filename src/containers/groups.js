/**
 * Created by jinzhe cui on 8/27/20.
 */
import React from 'react';
import Grid from '@material-ui/core/Grid/index';
// import { makeStyles } from '@material-ui/core/styles/index';
import UserGroups from "../components/userGroups";
import Button from '@material-ui/core/Button';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// }));


export const Groups = () => {
    // const classes = useStyles();

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={11}>
                    <UserGroups />

                    <Button variant="contained"
                            style={{float: 'right', marginTop: 10 }}
                            color="primary"
                            className="float-right"
                            href="/create-group/"
                    >
                        + Create Group
                    </Button>

                    <Button variant="contained"
                            style={{float: 'right', marginTop: 10, marginRight: 30}}
                            color="primary"
                            className="float-right"
                            href="/find-group/"
                    >
                        + Join Group
                    </Button>
                </Grid>
            </Grid>
        </>
    );


};

export default Groups;