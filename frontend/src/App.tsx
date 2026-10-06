import { useState, useEffect } from "react";
import JobApplicationForm from "./components/JobApplicationForm";
import {
  getJobApplications,
  archiveJobApplication,
  type JobApplication,
} from "./api/jobapplicationApi";

function App() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>();

  useEffect(() => {
    loadApplications();
  }, []);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>{error}</p>;

  async function loadApplications() {
    await getJobApplications()
      .then(setApplications)
      .catch(() => setError("Could not load job applications"))
      .finally(() => setLoading(false));
  }

  function handleCloseForm() {
    setShowUploadForm(false);
    setSelectedApplication(null);
  }

  async function handleFormSave() {
    handleCloseForm();
    await loadApplications();
  }

  function handleEdit(application: JobApplication) {
    setSelectedApplication(application);
    setShowUploadForm(true);
  }

  async function handleArchive(applicationId: number) {
    await archiveJobApplication(applicationId);
    loadApplications();
  }

  return (
    <>
      <h1>Job Application Tracker</h1>
      {!showUploadForm ? (
        <button onClick={() => setShowUploadForm(true)}>
          [Upload new application]
        </button>
      ) : (
        <>
          <JobApplicationForm
            onSaved={handleFormSave}
            onCancel={handleCloseForm}
            application={selectedApplication ?? null}
          ></JobApplicationForm>
        </>
      )}

      {applications.length === 0 ? (
        <p>No application yet.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Job Title</th>
                <th>Status</th>
                <th>Location</th>
                <th>Date Applied</th>
                <th>Notes</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.company_name}</td>
                  <td>{app.job_title}</td>
                  <td>{app.status}</td>
                  <td>{app.location}</td>
                  <td>{app.date_applied}</td>
                  <td>{app.notes}</td>
                  <td>
                    <button onClick={() => handleEdit(app)}>Edit</button>
                    <button onClick={() => handleArchive(app.id)}>
                      Archive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default App;
