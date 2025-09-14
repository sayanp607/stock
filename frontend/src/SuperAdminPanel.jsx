import React, { useEffect, useState } from "react";
import { auth } from "./firebase";

const SUPER_ADMIN_EMAIL = "sayanp607@gmail.com";

const SuperAdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.email === SUPER_ADMIN_EMAIL) {
      fetch("http://localhost:5000/api/auth/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.users || []);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch users");
          setLoading(false);
        });
    }
  }, [currentUser]);

  const handleChangeRole = async (uid, newRole) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/update-user-role",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            targetUid: uid,
            newRole,
            requesterEmail: SUPER_ADMIN_EMAIL,
          }),
        }
      );
      const data = await response.json();
      if (!data.success) throw new Error(data.error || "Failed to update role");
      alert("Role updated!");
      // Refresh user list
      fetch("http://localhost:5000/api/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.users || []);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (err) {
      alert("Failed to update role: " + err.message);
      setLoading(false);
    }
  };

  if (!currentUser || currentUser.email !== SUPER_ADMIN_EMAIL) {
    return null;
  }

  return (
    <div style={{ padding: 32 }}>
      <h2>Registered Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 8 }}>Name</th>
              <th style={{ textAlign: "left", padding: 8 }}>Email</th>
              <th style={{ textAlign: "left", padding: 8 }}>Role</th>
              <th style={{ textAlign: "left", padding: 8 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td style={{ padding: 8 }}>{user.name}</td>
                <td style={{ padding: 8 }}>{user.email}</td>
                <td style={{ padding: 8 }}>
                  {user.email === SUPER_ADMIN_EMAIL ? "super_admin" : user.role}
                </td>
                <td style={{ padding: 8 }}>
                  {user.email !== SUPER_ADMIN_EMAIL &&
                    (user.role === "user" ? (
                      <button
                        style={{
                          background:
                            "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)",
                          color: "#fff",
                          border: "none",
                          borderRadius: 10,
                          fontWeight: 700,
                          fontSize: "1rem",
                          padding: "10px 28px",
                          boxShadow: "0 4px 16px rgba(44,62,80,0.18)",
                          cursor: "pointer",
                          transition: "background 0.2s, transform 0.2s",
                          marginRight: 8,
                          letterSpacing: "0.5px",
                        }}
                        onClick={() => handleChangeRole(user.uid, "admin")}
                      >
                        Change to Admin
                      </button>
                    ) : user.role === "admin" ? (
                      <button
                        style={{
                          background:
                            "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
                          color: "#fff",
                          border: "none",
                          borderRadius: 10,
                          fontWeight: 700,
                          fontSize: "1rem",
                          padding: "10px 28px",
                          boxShadow: "0 4px 16px rgba(44,62,80,0.18)",
                          cursor: "pointer",
                          transition: "background 0.2s, transform 0.2s",
                          marginRight: 8,
                          letterSpacing: "0.5px",
                        }}
                        onClick={() => handleChangeRole(user.uid, "user")}
                      >
                        Change to User
                      </button>
                    ) : null)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SuperAdminPanel;
