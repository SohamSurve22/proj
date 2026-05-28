import { useState } from "react";
import Login from "./Login";
import Admin from "./Admin";
import User from "./User";

export default function App() {
  const [page, setPage] = useState("user"); // user | login | admin

  return (
    <div>
      {page !== "admin" && (
        <div className="nav">
          <button onClick={() => setPage("user")}>User Page</button>
          <button onClick={() => setPage("login")}>Admin Login</button>
        </div>
      )}

      {page === "user" && <User />}
      {page === "login" && <Login onSuccess={() => setPage("admin")} onBack={() => setPage("user")} />}
      {page === "admin" && <Admin onLogout={() => setPage("user")} />}
    </div>
  );
}
