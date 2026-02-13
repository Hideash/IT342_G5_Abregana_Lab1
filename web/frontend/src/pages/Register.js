import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    gender: "",
    age: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        name: formData.firstname + " " + formData.lastname
        })

      });
      if (!response.ok) throw new Error("Registration failed");
      const data = await response.json();
      alert("User registered successfully!");
      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br/>
        <input name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required /><br/>
        <input name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required /><br/>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /><br/>
        <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} /><br/>
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} /><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
