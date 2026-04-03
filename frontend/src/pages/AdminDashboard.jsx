import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ComplaintCard from "../components/ComplaintCard";
import API from "../services/api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique departments from complaints
  const uniqueDepartments = Array.from(
    new Set(complaints
      .map(c => c.department)
      .filter(dept => dept && dept.trim())
    )
  ).sort();

  // Fetch complaints from API
  const fetchComplaints = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await API.get("/complaints");
      setComplaints(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching complaints", error);
      setErrorMessage(error.response?.data?.message || "Unable to load complaints.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  // Update complaint status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/complaints/${id}/status`, { status });
      // Update local state without refetching
      setComplaints(prev =>
        prev.map(c => (c._id === id ? { ...c, status } : c))
      );
    } catch (error) {
      console.error("Error updating status", error);
      alert("Failed to update complaint status");
    }
  };

  // Filter complaints
  const filteredComplaints = complaints
    .filter(c => statusFilter === "all" || c.status === statusFilter)
    .filter(c => 
      departmentFilter === "all" || 
      (c.department || "").trim().toLowerCase() === departmentFilter.trim().toLowerCase()
    )
    .filter(c =>
      searchTerm === "" ||
      (c.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       c.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       c.description?.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <Navbar />

      <main className="admin-page">
        <section className="admin-shell">
          <h2>Admin Dashboard</h2>

          {/* Filters */}
          <div className="admin-filters">
            <input
              type="text"
              placeholder="Search by user, email, or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

            <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
              <option value="all">All Departments</option>
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Loading / Error / Empty */}
          {errorMessage && <p className="admin-empty">{errorMessage}</p>}
          {!errorMessage && isLoading && <p className="admin-empty">Loading complaints...</p>}
          {!errorMessage && !isLoading && filteredComplaints.length === 0 && (
            <p className="admin-empty">No complaints match your filters.</p>
          )}

          {/* Complaint List */}
          <div className="admin-list">
            {filteredComplaints.map((c) => (
              <ComplaintCard
                key={c._id}
                complaint={c}
                isAdmin={true}
                onStatusChange={updateStatus}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}