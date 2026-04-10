import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router"
import './index.css'
import App from './App.jsx'
import Layout from './routes/Layout.jsx'
import DetailRow from './routes/DetailRow.jsx'
import NotFound from './routes/NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="/breweryDetails/:id" element={<DetailRow />} />
      </Route>
      <Route path='*' element={<NotFound />} />

  </Routes>
  </BrowserRouter>
)
