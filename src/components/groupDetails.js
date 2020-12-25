import React from 'react';
import {useParams} from "react-router-dom";

export default function GroupDetails() {
    let object = useParams();

    return (
        <>
            Hi! team {object.id}
        </>
    );
}