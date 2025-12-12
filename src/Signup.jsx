import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

function SignUp() {
  const [title, setTitle] = useState("Mr.");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [socialSignup, setSocialSignup] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const navigate = useNavigate();

  // Password validation checks
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[\W_]/.test(password);
  const hasMinLength = password.length >= 8;
  const isPasswordValid = hasLower && hasUpper && hasDigit && hasSpecial && hasMinLength;
  const isPasswordMatch = password === confirmPassword;

  const isFormValid = isPasswordValid && isPasswordMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      await fetch("http://localhost:8000/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          firstName,
          lastName,
          country,
          city,
          number,
          email,
          password,
        }),
      });

      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setEmail(user.email || "");
      setSocialSignup(true);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "#f5f5f5", padding: "2rem", borderRadius: "10px", maxWidth: "800px", margin: "auto", marginTop: "2rem" }}>
      <h3 className="mb-4">{socialSignup ? "Complete Social Signup" : "REGISTER"}</h3>
      <div className="row">
        <div className="col-md-2 mb-3">
          <select className="form-select" value={title} onChange={(e) => setTitle(e.target.value)}>
            <option>Mr.</option>
            <option>Ms.</option>
            <option>Mrs.</option>
          </select>
        </div>
        <div className="col-md-5 mb-3">
          <input
            type="text"
            placeholder="First Name"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-5 mb-3">
          <input
            type="text"
            placeholder="Last Name"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <select className="form-select" value={city} onChange={(e) => setCity(e.target.value)}>
            <option disabled>Select City Name</option>
            <option>Ahmedabad</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>New York</option>
            <option>London</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <input
            type="tel"
            className="form-control"
            placeholder="Mobile No"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            readOnly={socialSignup}
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {passwordTouched && (
          <div className="col-md-12 mb-3">
            <ul className="text-dark bg-light p-2 rounded small">
              <li style={{ color: hasLower ? "green" : "red" }}>• At least one lowercase letter</li>
              <li style={{ color: hasUpper ? "green" : "red" }}>• At least one uppercase letter</li>
              <li style={{ color: hasDigit ? "green" : "red" }}>• At least one number</li>
              <li style={{ color: hasSpecial ? "green" : "red" }}>• At least one special character</li>
              <li style={{ color: hasMinLength ? "green" : "red" }}>• Minimum 8 characters</li>
              <li style={{ color: isPasswordMatch ? "green" : "red" }}>• Passwords match</li>
            </ul>
          </div>
        )}

        <div className="col-12 mb-2">
          <button type="submit" className="btn btn-warning w-100" disabled={!isFormValid}>
            {socialSignup ? "Finish Sign Up" : "CREATE ACCOUNT"}
          </button>
        </div>

        {!socialSignup && (
          <div className="col-6 mb-3">
            <button type="button" onClick={handleGoogleSignup} className="btn btn-danger w-100">
              <i className="bi bi-google fs-5"></i> Sign up with Google
            </button>
          </div>
        )}

        <div className="col-12">
          <Link to="/login" className="btn btn-link w-100 text-dark">
            <i className="bi bi-arrow-left-circle"></i> Already have an account?
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
