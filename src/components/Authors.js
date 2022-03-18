import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Link, useNavigate } from "react-router-dom";

//import { getAuthors } from "../api/authors";
import { getAuthors } from "../fetcher";

const LinkComponent = ({ data }) => {
    return <Link to={"/authors/" + data.id}>{data.name}</Link>;
};

const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const retrieveAuthors = async () => {
            try {
                const result = await getAuthors();
                setAuthors(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        retrieveAuthors();
    }, []);

    const createClick = (event) => {
        navigate("/authors/new");
    };

    const columnDefs = [
        {
            field: "name",
            cellRenderer: "LinkComponent",
        },
        { field: "address" },
        { field: "active" },
    ];

    return (
        <>
            <div>Authors</div>
            <button onClick={createClick}>Create</button>
            <div
                className="ag-theme-alpine"
                style={{ height: 400, width: 600 }}
            >
                <AgGridReact
                    rowData={authors}
                    columnDefs={columnDefs}
                    frameworkComponents={{
                        LinkComponent,
                    }}
                ></AgGridReact>
            </div>
        </>
    );
};

export default Authors;
