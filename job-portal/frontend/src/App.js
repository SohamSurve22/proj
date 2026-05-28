import { useState } from "react";
import Login from "./Login";
import Recruiter from "./Recruiter";
import Applicant from "./Applicant";

function App() {
  const [page, setPage] = useState("applicant");

  return (
    <div className="container">
      <h1>Job Portal</h1>

      {/* Quick exam switch buttons */}
      <div className="top-nav">
        <button onClick={() => setPage("applicant")}>Applicant</button>
        <button onClick={() => setPage("login")}>Recruiter Login</button>
      </div>

      {page === "login" && <Login onSuccess={() => setPage("recruiter")} />}
      {page === "recruiter" && <Recruiter />}
      {page === "applicant" && <Applicant />}
    </div>
  );
}

export default App;
