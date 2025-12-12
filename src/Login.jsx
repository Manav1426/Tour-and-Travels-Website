import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Login Success: " + data.message);
        console.log(data);
        localStorage.setItem("user_email", email);

        navigate("/Home"); // your route after login
      } else {
        alert("❌ " + data.error);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "cover3.jpeg",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          padding: "2rem",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 20px rgba(0,0,0,0.2)",
          width: "300px",
        }}
      >
        <h3 style={{textAlign:"center"}}>
          Log in
        </h3>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Enter email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            placeholder="Enter password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          style={{ fontWeight: "bold" }}
        >
          Log in
        </button>
        <div className="text-end mt-2">
          <a href="/signup" style={{ color: "black", fontSize: "0.9em" }}>
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
