import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

    const payload = {
        email: formData.email,
        password: formData.password
    };

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)  // send credentials in body
        });

        if (!response.ok) throw new Error("Login failed");

        const data = await response.json();
        alert("Login successful!");
        console.log(data);
        navigate("/dashboard");
    } catch (error) {
        alert(error.message);
    }
  };


  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br/>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
