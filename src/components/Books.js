import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Link } from "react-router-dom";

import { readAll } from "../fetcher";

const LinkComponent = ({ data }) => {
    return <Link to={"/books/" + data.id}>{data.title}</Link>
}


const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const retrieveBooks = async () => {
            try {
                const result = await readAll('book');
                setBooks(result.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        retrieveBooks();
    }, []);

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
