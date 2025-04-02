import React from "react";
import { useParams } from "react-router-dom";

const ViewItem = () => {
    const { id } = useParams()
    return (
        <div>{id}</div>
    )
}

export default ViewItem;