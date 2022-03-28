import React, { useEffect, useState } from "react";

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
            <div>Books</div>
            <Books books={books} />
        </>
    );
};

export default BooksPage;
