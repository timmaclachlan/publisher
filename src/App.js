import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import './App.css';

import Dashboard from './components/Dashboard';
import Authors from './components/Authors';
import Books from './components/Books';

function App() {
  return (
    <>
      <header>Foobar Publishing</header>
      <section>
        <nav>
          <ul>
            <li><Link to="/authors">Authors</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/sales">Sales</Link></li>
            <li><Link to="/royalties">Royalties</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
              <Route index element={<Dashboard />} />
              <Route path="authors" element={<Authors />} />
              <Route path="books" element={<Books />} />
          </Routes>            
        </main>
      </section>
      <footer>
        <p>&copy;2022</p>
      </footer>      
      </>

  );
}

export default App;
