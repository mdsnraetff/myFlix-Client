import React from "react";

export const MovieFilter = (props) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search For Director"
                value={props.searchTerm}
                onChange={(e) => props.setSearchTerm(e.target.value)}
                style={{ width: "100%", padding: "10px" }} />
        </div>
    )
}