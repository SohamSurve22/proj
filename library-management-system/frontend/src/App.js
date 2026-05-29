import React, { useState } from "react";
import Login from "./Login";
import Admin from "./Admin";
import User from "./User";

function App() {
  const [page, setPage] = useState("user");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  return (
    <div className="container">
      <h1>Library Management System</h1>
      <div className="topBar">
        <button className={page === "user" ? "active" : ""} onClick={() => setPage("user")}>
          Student Side
        </button>
        <button className={page === "admin" ? "active" : ""} onClick={() => setPage("admin")}>
          Librarian Side
        </button>
      </div>

      {page === "user" && <User />}

      {page === "admin" && !adminLoggedIn && <Login onSuccess={() => setAdminLoggedIn(true)} />}

      {page === "admin" && adminLoggedIn && <Admin />}
    </div>
  );
}

export default App;
