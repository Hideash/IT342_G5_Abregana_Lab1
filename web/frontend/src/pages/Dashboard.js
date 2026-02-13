import React, { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user info from backend
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
            // If you implement authentication with JWT later, add:
            // "Authorization": `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading user info...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.firstname} {user.lastname}!</p>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <p>Gender: {user.gender}</p>
    </div>
  );
}

export default Dashboard;
