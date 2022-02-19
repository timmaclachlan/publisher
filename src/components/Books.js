import React from "react";
import { AgGridReact } from 'ag-grid-react';
import { Link } from "react-router-dom";

import { getBooks } from "../api/books.js";

const LinkComponent = ({ data }) => {
    return <Link to={"/books/" + data.id}>{data.title}</Link>
}


const Books = () => {

const columnDefs = [
    {
        field: "title",
        cellRenderer: "LinkComponent"
    },
    { field: "format" },
    { field: "price" },
];
  
    return (
        <>
            <div>Books</div>
            <div
                className="ag-theme-alpine"
                style={{ height: 400, width: 600 }}
            >
                <AgGridReact
                    rowData={getBooks()}
                    columnDefs={columnDefs}
                    frameworkComponents={{
                        LinkComponent
                    }}
                ></AgGridReact>
            </div>
        </>
    );
};

export default Books;
