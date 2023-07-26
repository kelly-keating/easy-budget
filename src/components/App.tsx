import { Link, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

import Breakdown from './Breakdown'
import Input from './fileInput/Input'
import Summary from './Summary'
import Filters from './Filters'

function App() {
  const { pathname } = useLocation()

  const pageIs = (path: string) => pathname === path
  const link = (path: string, text: string) => (
    <Link className={pageIs(path) ? 'nav-link-on-page' : 'nav-link'} to={path}>
      {text}
    </Link>
  )

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">Easy Budget</Link>
      </header>
      <section>
        <nav>
          {link('/', 'Overview')}
          {link('/breakdown', 'Details')}
          {link('/filters', 'Filters')}
          {link('/add', 'Add new')}
        </nav>
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/breakdown" element={<Breakdown />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/add" element={<Input />} />
        </Routes>
      </section>
    </div>
  )
}

export default App
