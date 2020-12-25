import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {post} from "../services/api/apiService";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    formButton: {
        display: "flex",
        marginRight: 10,
        marginLeft: 10
    },
    textInput: {
        width: 300
    }
});

export default function CreateGroup() {
    const classes = useStyles();
    // const [openSuccess, setOpenSuccess] = useState(false);
    // const [openFailure, setOpenFailure] = useState(false);
    const [formFieldValues, setFormFieldValues] = useState({
       groupName: "",
       groupOwner: "@data_powered",
       followAll: false,
       retweetAll: false,
       likeAll: false,
    });
    let history = useHistory();

    const handleFormFieldChange = event => {
        setFormFieldValues({
            ...formFieldValues,
            [event.target.name]: event.target.value
        });
    };

    const handleCheckbox = event => {
        setFormFieldValues({
            ...formFieldValues,
            [event.target.name]: event.target.checked
        });
    };

    // const handleSuccessOpen = () => {
    //     setOpenSuccess(true);
    // };

    // const handleSuccessClose = (event, reason) => {
    //     if(reason === 'clickaway'){
    //         return;
    //     }
    //     setOpenFailure(false);
    // };

    // const handleFailureOpen = () => {
    //   setOpenFailure(true);
    // };

    const handleFailureClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        // setOpenFailure(false);
    };

    function clearForm(){
        setFormFieldValues({
        ...formFieldValues,
            groupName: "",
            groupOwner: "@data_powered",
            followAll: false,
            retweetAll: false,
            likeAll: false,
        });
    };

    function isDisabled() {
        return !(formFieldValues.groupName && formFieldValues.groupOwner)
    }

    function handleSubmit(event) {

        post("groups", {
            "groupName":formFieldValues.groupName,
            "groupOwner": formFieldValues.groupOwner,
            "followAll": formFieldValues.followAll,
            "retweetAll": formFieldValues.retweetAll,
            "likeAll": formFieldValues.likeAll
        })
            .then(() => {
                // handleSuccessOpen();
                clearForm();

                history.push('/groups')
            })
            .catch((e) => {
                handleFailureClose();
                console.log(e);
            });
        event.preventDefault()
    }

    return (
        <>
            <form
            onSubmit={handleSubmit}
            >
                <div>
                    <TextField
                        required
                        label="Group Name"
                        type="text"
                        variant="outlined"
                        data-testid="groupName"
                        id="groupName"
                        name="groupName"
                        value={formFieldValues.groupName}
                        onChange={handleFormFieldChange}
                        className={classes.textInput}
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={formFieldValues.followAll} onChange={handleCheckbox} name="followAll" id="followAll"/>}
                            label="Require Members To Follow All Others"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={formFieldValues.retweetAll} onChange={handleCheckbox} name="retweetAll" id="retweetAll"/>}
                            label="Require Members To Retweet All Tweets"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={formFieldValues.likeAll} onChange={handleCheckbox} name="likeAll" id="likeAll"/>}
                            label="Require Members to Like All Tweets"
                        />
                    </FormGroup>
                <span className={classes.formButton}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isDisabled()}
                        data-testid="submitButton"
                        id="submitButton"
                        className={classes.formButton}

                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={clearForm}
                        data-testid="clearButton"
                        id="clearButton"
                        className={classes.formButton}
                    >
                        Clear
                    </Button>
                </span>
                </div>
            </form>
        </>
    );
}