import { Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

import Breakdown from './Breakdown'
import Input from './Input'
import Summary from './Summary'

function App() {
  const { pathname } = useLocation()

  const pageIs = (path: string) => pathname === path

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">Easy Budget</Link>
      </header>
      <section>
        <nav>
          <Link
            className={pageIs('/') ? 'nav-link-on-page' : 'nav-link'}
            to="/"
          >
            Overview
          </Link>
          <Link
            className={pageIs('/breakdown') ? 'nav-link-on-page' : 'nav-link'}
            to="/breakdown"
          >
            Details
          </Link>
          <Link
            className={pageIs('/add') ? 'nav-link-on-page' : 'nav-link'}
            to="/add"
          >
            Add new
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/breakdown" element={<Breakdown />} />
          <Route path="/add" element={<Input />} />
        </Routes>
      </section>
    </div>
  )
}

export default App
