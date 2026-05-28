import React, { useState } from "react";
import User from "./User";
import Login from "./Login";
import Admin from "./Admin";
import "./App.css";

function App() {
  // Page state: "user" or "admin"
  const [currentPage, setCurrentPage] = useState("user");
  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentPage("user"); // redirect back to user portal on logout
  };

  return (
    <div className="App">
      {/* Header Navigation */}
      <header className="header">
        <div className="header-brand">
          <h1>🏨 Mumbai Grand Hotel</h1>
        </div>
        <nav className="nav-links">
          <button
            className={`nav-btn ${currentPage === "user" ? "active" : ""}`}
            onClick={() => setCurrentPage("user")}
          >
            Customer Portal
          </button>
          
          {isAdminLoggedIn ? (
            <>
              <button
                className={`nav-btn ${currentPage === "admin" ? "active" : ""}`}
                onClick={() => setCurrentPage("admin")}
              >
                Admin Panel
              </button>
              <button className="nav-btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button
              className={`nav-btn ${currentPage === "admin" ? "active" : ""}`}
              onClick={() => setCurrentPage("admin")}
            >
              Admin Login
            </button>
          )}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {currentPage === "user" && <User />}
        
        {currentPage === "admin" && (
          isAdminLoggedIn ? (
            <Admin />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        )}
      </main>

      {/* Footer (standard for university practicals) */}
      <footer className="footer">
        <p>Mumbai University - Third Year Full Stack Development Exam Project</p>
      </footer>
    </div>
  );
}

export default App;
