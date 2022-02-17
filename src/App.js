import './App.css';

import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <header>Foobar Publishing</header>
      <section>
        <nav>
          <ul>
            <li>Authors</li>
            <li>Books</li>
            <li>Sales</li>
            <li>Royalties</li>
          </ul>
        </nav>
        <main>
          <Dashboard />
        </main>
      </section>
      <footer>
        <p>&copy;2022</p>
      </footer>      
      </>
  );
}

export default App;
