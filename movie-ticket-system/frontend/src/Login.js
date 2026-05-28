import { useState } from "react";

export default function Login({ onSuccess, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded credentials for exam use
    if (email === "admin@gmail.com" && password === "admin123") onSuccess();
    else alert("Invalid Credentials");
  };

  return (
    <div className="center-card">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} className="form">
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button className="secondary" onClick={onBack}>
        Back to User
      </button>
    </div>
  );
}
