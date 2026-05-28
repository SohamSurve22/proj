import React, { useState } from "react";

function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // QUICK EXAM EDIT:
  // Change admin credentials here if needed by faculty.
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin123") {
      onSuccess();
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="loginCard">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} className="formGrid">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
