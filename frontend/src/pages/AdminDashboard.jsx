import { useEffect, useState } from "react";
import API from "../services/api";

const BACKEND_ORIGIN = (import.meta.env.VITE_BACKEND_ORIGIN || "http://localhost:5001").replace(/\/$/, "");

export default function AdminDashboard() {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {

      const res = await API.get("/complaints");

      setComplaints(res.data);

    } catch (error) {
      console.error("Error fetching complaints", error);
    }
  };

  const updateStatus = async (id, status) => {

    try {

      await API.put(`/complaints/${id}/status`, {
        status
      });

      fetchComplaints();

    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>Admin Dashboard</h2>

      {complaints.map((c) => (

        <div
          key={c._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >

          <p><b>Description:</b> {c.description}</p>

          <p><b>Status:</b> {c.status}</p>

          <p><b>Department:</b> {c.department}</p>

          {c.image && (
            <img
              src={`${BACKEND_ORIGIN}/${c.image}`}
              width="200"
              alt="complaint"
            />
          )}

          <br />

          <button onClick={() => updateStatus(c._id, "in-progress")}>
            Start
          </button>

          <button
            onClick={() => updateStatus(c._id, "resolved")}
            style={{ marginLeft: "10px" }}
          >
            Resolve
          </button>

        </div>

      ))}

    </div>

  );
}