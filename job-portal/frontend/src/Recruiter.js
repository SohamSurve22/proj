import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function Recruiter() {
  const [form, setForm] = useState({
    jobTitle: "",
    companyName: "",
    salary: "",
    location: "",
    description: ""
  });
  const [applications, setApplications] = useState([]);

  const loadApplications = async () => {
    try {
      const res = await axios.get(`${API}/applications`);
      setApplications(res.data);
    } catch {
      alert("Error loading applicants");
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const addJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/job`, form);
      alert("Job Added");
      setForm({
        jobTitle: "",
        companyName: "",
        salary: "",
        location: "",
        description: ""
      });
    } catch {
      alert("Error adding job");
    }
  };

  return (
    <div>
      <div className="card">
        <h2>Recruiter Dashboard</h2>
        <form onSubmit={addJob}>
          <input placeholder="Job Title" value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })} required />
          <input placeholder="Company Name" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} required />
          <input placeholder="Salary" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} required />
          <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
          <textarea placeholder="Job Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <button type="submit">Add Job</button>
        </form>
      </div>

      <div className="card">
        <h3>Applicants</h3>
        {applications.map((a, i) => (
          <div key={i} className="list-item">
            <b>{a.applicantName}</b> ({a.email}) - {a.jobTitle}
            <div>Resume: {a.resume}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recruiter;
