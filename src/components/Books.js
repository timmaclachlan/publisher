import React from "react";
import { AgGridReact } from 'ag-grid-react';

import { books } from '../db/db.js';

const Books = () => {

const columnDefs = [
    { field: "title" },
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
                    rowData={books}
                    columnDefs={columnDefs}
                ></AgGridReact>
            </div>
        </>
    );
};

export default Books;
