import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import Dashboard from "./components/Dashboard";
import AuthorsPage from "./components/AuthorsPage";
import BooksPage from "./components/BooksPage";
import BookDetailPage from "./components/BookDetailPage";
import AuthorDetailPage from "./components/AuthorDetailPage";

function App() {
    return (
        <>
            <header>Foobar Publishing</header>
            <section>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/authors">Authors</Link>
                        </li>
                        <li>
                            <Link to="/books">Books</Link>
                        </li>
                        <li>
                            <Link to="/sales">Sales</Link>
                        </li>
                        <li>
                            <Link to="/royalties">Royalties</Link>
                        </li>
                    </ul>
                </nav>
                <main>
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path="authors" element={<AuthorsPage />} />
                        <Route path="authors/:id" element={<AuthorDetailPage />} />
                        <Route path="authors/new" element={<AuthorDetailPage />} />
                        <Route path="books" element={<BooksPage />} />
                        <Route path="books/:id" element={<BookDetailPage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </section>
            <footer>
                <p>&copy;2022</p>
            </footer>
        </>
    );
}

function NotFound() {
    return <div>Sorry, not found!</div>;
}

export default App;
