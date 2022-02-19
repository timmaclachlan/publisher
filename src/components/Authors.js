import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import { Link } from "react-router-dom";

import { getAuthors } from "../api/authors";

const LinkComponent = ({ data }) => {
    return <Link to={"/authors/" + data.id}>{data.name}</Link>
}


const Authors = () => {
  const columnDefs = [
      {
          field: "name",
          cellRenderer: "LinkComponent"
      },
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
                    frameworkComponents={{
                        LinkComponent
                    }}
                ></AgGridReact>
            </div>
        </>
    );
}

export default Authors