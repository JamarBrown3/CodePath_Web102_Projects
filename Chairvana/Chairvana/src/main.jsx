import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/index.css'
import App from './App.jsx'
import Layout from './routes/layout.jsx'
import UpdatePost from './routes/updatePost.jsx'
import CreatePost from './routes/createPost.jsx'
import DetailsPage from './routes/detailsPage.jsx'
import DeletePost from './routes/deletePost.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                {/* 1. This should be your 'App' (the feed), not createPost */}
                <Route index element={<App />} />

                {/* 2. Standard page routes */}
                <Route path="create" element={<CreatePost />} />
                <Route path="edit" element={<UpdatePost />} />
                <Route path="delete" element={<DeletePost />} />

                {/* 3. Specific ID routes (for clicking a specific chair) */}
                <Route path="details/:id" element={<DetailsPage />} />

                {/* Keep the 'main' path if you really want it, but 'index' covers it */}
                <Route path="main" element={<App />} />
            </Route>
        </Routes>
    </BrowserRouter>
)



