import React from 'react'
import { AgGridReact } from 'ag-grid-react';

import { getAuthors } from "../api/authors";

const Authors = () => {
  const columnDefs = [
    { field: "name" },
    { field: "address" },
    { field: "active" },
];
  
    return (
        <>
            <div>Authors</div>
            <div
                className="ag-theme-alpine"
                style={{ height: 400, width: 600 }}
            >
                <AgGridReact
                    rowData={getAuthors()}
                    columnDefs={columnDefs}
                ></AgGridReact>
            </div>
        </>
    );
}

export default Authors