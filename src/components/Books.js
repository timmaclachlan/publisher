import React from "react";
import { AgGridReact } from 'ag-grid-react';
import { Link } from "react-router-dom";

const LinkComponent = ({ data }) => {
    return <Link to={"/books/" + data.id}>{data.title}</Link>
}


const Books = ({books}) => {
  
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
            <div
                className="ag-theme-alpine"
                style={{ height: 400, width: 620 }}
            >
                <AgGridReact
                    rowData={books}
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
