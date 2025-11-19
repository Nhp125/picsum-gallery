import React from "react";
import { HashRouter as Routes, Route, Link, Navigate } from "react-router-dom";
import PhotoList from "./pages/PhotoList";
import PhotoDetail from "./pages/PhotoDetail";

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/photos">
            Picsum Gallery
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/photos">
                  Photos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Navigate to="/photos" replace />} />
          <Route path="/photos" element={<PhotoList />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
        </Routes>
      </main>

      <footer className="text-center py-3">
        <small>Built with Lorem Picsum API</small>
      </footer>
    </div>
  );
}
