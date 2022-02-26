import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Link } from "react-router-dom";

import { getBooks } from "../api/books.js";

const LinkComponent = ({ data }) => {
    return <Link to={"/books/" + data.id}>{data.title}</Link>
}


const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const retrieveBooks = async () => {
            const result = await getBooks();
            setBooks(result);
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
