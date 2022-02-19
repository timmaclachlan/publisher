import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import Dashboard from "./components/Dashboard";
import Authors from "./components/Authors";
import Books from "./components/Books";
import BookDetail from "./components/BookDetail";
import AuthorDetail from "./components/AuthorDetail";

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
                        <Route path="authors" element={<Authors />} />
                        <Route path="authors/:id" element={<AuthorDetail />} />
                        <Route path="books" element={<Books />} />
                        <Route path="books/:id" element={<BookDetail />} />
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
