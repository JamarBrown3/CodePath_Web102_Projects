import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router" // Or "react-router-dom" depending on your version
import './index.css'
import App from './App.jsx'
import Layout from './routes/Layout.jsx'
import CrewSummary from './routes/CrewSummary.jsx'
import CrewGallery from './routes/CrewGallery.jsx' // Fixed typo
import NotFound from './routes/NotFound.jsx'
import CreateCrew from './routes/CreateCrewMates.jsx'
import EditCrew from './routes/EditCrew.jsx' // Completed import

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="/gallery" element={<CrewGallery />} />
        <Route path="/details/:id" element={<CrewSummary />} />
        <Route path="/create" element={<CreateCrew />} />
        <Route path="/edit/:id" element={<EditCrew />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)