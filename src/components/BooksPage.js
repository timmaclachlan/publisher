import React, { useEffect, useState } from "react";

import { Typography } from "@mui/material";

import Books  from "./Books";

import { readAll } from "../fetcher";

const BooksPage = () => {
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


  
    return (
        <>
                  <Typography variant="h4">Books</Typography>
            <Books books={books} />
        </>
    );
};

export default BooksPage;
