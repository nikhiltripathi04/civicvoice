import "./ComplaintCard.css";

const statusClassMap = {
 pending: "status-pending",
 assigned: "status-assigned",
 "in-progress": "status-in-progress",
 resolved: "status-resolved"
};

const formatDate = (value) => {
 if (!value) {
  return "-";
 }

 const date = new Date(value);

 if (Number.isNaN(date.getTime())) {
  return "-";
 }

 return date.toLocaleString();
};

export default function ComplaintCard({ complaint }) {
 if (!complaint) {
  return null;
 }

 const status = complaint.status || "pending";
 const statusClass = statusClassMap[status] || "status-pending";

 return (
  <article className="complaint-card">
   <div className="complaint-card-header">
    <h3>Complaint #{complaint._id?.slice(-6)?.toUpperCase() || "N/A"}</h3>
    <span className={`status-chip ${statusClass}`}>{status}</span>
   </div>

   <p className="complaint-description">{complaint.description || "No description provided"}</p>

   <div className="complaint-grid">
    <div>
     <label>Category</label>
     <p>{complaint.category || "Uncategorized"}</p>
    </div>
    <div>
     <label>Department</label>
     <p>{complaint.department || "Not assigned"}</p>
    </div>
    <div>
     <label>Latitude</label>
     <p>{complaint.location?.lat ?? "-"}</p>
    </div>
    <div>
     <label>Longitude</label>
     <p>{complaint.location?.lng ?? "-"}</p>
    </div>
    <div>
     <label>Created At</label>
     <p>{formatDate(complaint.createdAt)}</p>
    </div>
    <div>
     <label>Updated At</label>
     <p>{formatDate(complaint.updatedAt)}</p>
    </div>
   </div>
  </article>
 );
}
