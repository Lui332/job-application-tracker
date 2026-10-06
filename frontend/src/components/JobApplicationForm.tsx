import { useState } from "react";
import {
  createJobApplication,
  updateJobApplication,
  type CreateJobApplicationRequest,
  type JobApplication,
} from "../api/jobapplicationApi";

type JobApplicationFormProps = {
  onSaved: () => void;
  onCancel: () => void;
  application: JobApplication | null;
};

function JobApplicationForm({
  onSaved,
  onCancel,
  application,
}: JobApplicationFormProps) {
  const [isEditing, setIsEditing] = useState<boolean>(application != null);
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<CreateJobApplicationRequest>({
    company_name: application?.company_name ?? "",
    job_title: application?.job_title ?? "",
    status: application?.status ?? "",
    location: application?.location ?? "",
    job_url: application?.job_url ?? "",
    notes: application?.notes ?? "",
    date_applied: application?.date_applied ?? null,
  });

  const handleNewApplicationUpload = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      if (application === null) {
        await createJobApplication(form);
      } else {
        await updateJobApplication(application.id, form);
      }

      onSaved();
    } catch (error) {
      console.log("Error encountered");
    }
  };

  return (
    <form onSubmit={(e) => handleNewApplicationUpload(e)}>
      <label>Company Name</label>
      <input
        type="text"
        value={form.company_name}
        onChange={(e) => setForm({ ...form, company_name: e.target.value })}
        required
      ></input>
      <label>Job Title</label>
      <input
        type="text"
        value={form.job_title}
        onChange={(e) => setForm({ ...form, job_title: e.target.value })}
        required
      ></input>
      <label>Status</label>
      <input
        type="text"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        required
      ></input>
      <label>Location</label>
      <input
        type="text"
        value={form.location ?? ""}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      ></input>
      <label>Job URL</label>
      <input
        type="text"
        value={form.job_url ?? ""}
        onChange={(e) => setForm({ ...form, job_url: e.target.value })}
        required
      ></input>
      <label>Notes</label>
      <input
        type="text"
        value={form.notes ?? ""}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      ></input>
      <label>Date Applied</label>
      <input
        type="date"
        value={form.date_applied ?? ""}
        onChange={(e) => setForm({ ...form, date_applied: e.target.value })}
        max={new Date().toISOString().split("T")[0]}
      ></input>
      <button type="submit">{isEditing ? "Update" : "Upload"}</button>
      <button type="button" onClick={() => onCancel()}>
        Cancel
      </button>
    </form>
  );
}

export default JobApplicationForm;
