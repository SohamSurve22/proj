import React, { useState } from "react";
import Login from "./Login";
import Admin from "./Admin";
import Student from "./Student";

function App() {
  // Change initial page quickly during exam if needed.
  const [page, setPage] = useState("student");

  return (
    <div className="container">
      <h1>College Event Management</h1>
      <div className="top-buttons">
        <button onClick={() => setPage("student")}>Student Side</button>
        <button onClick={() => setPage("login")}>Admin Login</button>
      </div>

      {page === "student" && <Student />}
      {page === "login" && <Login onSuccess={() => setPage("admin")} />}
      {page === "admin" && <Admin onLogout={() => setPage("login")} />}
    </div>
  );
}

export default App;
