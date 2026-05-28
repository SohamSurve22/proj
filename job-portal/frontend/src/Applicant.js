import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function Applicant() {
  const [jobs, setJobs] = useState([]);
  const [history, setHistory] = useState([]);
  const [form, setForm] = useState({
    applicantName: "",
    email: "",
    resume: "",
    jobTitle: "",
    companyName: "",
    salary: "",
    location: "",
    description: ""
  });

  const loadJobs = async () => {
    try {
      const res = await axios.get(`${API}/jobs`);
      setJobs(res.data);
    } catch {
      alert("Error loading jobs");
    }
  };

  const loadHistory = async () => {
    try {
      const res = await axios.get(`${API}/applications`);
      setHistory(res.data);
    } catch {
      alert("Error loading history");
    }
  };

  useEffect(() => {
    loadJobs();
    loadHistory();
  }, []);

  const applyJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/apply`, form);
      alert("Application Submitted");
      setForm({ ...form, applicantName: "", email: "", resume: "" });
      loadHistory();
    } catch {
      alert("Error submitting application");
    }
  };

  const chooseJob = (job) => {
    // Copy selected job values into form before applying.
    setForm({
      ...form,
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      salary: job.salary,
      location: job.location,
      description: job.description
    });
  };

  return (
    <div>
      <div className="card">
        <h2>Job Listings</h2>
        {jobs.map((j, i) => (
          <div key={i} className="list-item">
            <b>{j.jobTitle}</b> - {j.companyName} ({j.location})
            <div>Salary: {j.salary}</div>
            <div>{j.description}</div>
            <button onClick={() => chooseJob(j)}>Select Job</button>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Applicant Registration + Apply</h3>
        <form onSubmit={applyJob}>
          <input placeholder="Applicant Name" value={form.applicantName} onChange={(e) => setForm({ ...form, applicantName: e.target.value })} required />
          <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="Resume Link or Filename" value={form.resume} onChange={(e) => setForm({ ...form, resume: e.target.value })} required />
          <input placeholder="Selected Job Title" value={form.jobTitle} readOnly required />
          <button type="submit">Apply</button>
        </form>
      </div>

      <div className="card">
        <h3>Application History</h3>
        {history.map((h, i) => (
          <div key={i} className="list-item">
            <b>{h.applicantName}</b> applied for {h.jobTitle} at {h.companyName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applicant;
