import { useState } from "react";

function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Easy-to-edit credentials for exam demo.
    if (email === "recruiter@gmail.com" && password === "recruiter123") {
      onSuccess();
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="card login-card">
      <h2>Recruiter Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
