export type JobApplication = {
  id: number;
  company_name: string;
  job_title: string;
  status: string;
  location?: string | null;
  job_url?: string | null;
  notes?: string | null;
  date_applied?: string | null;
  created_at?: string | null;
  is_archived?: string | null;
  archived_at?: string | null;
};

export type CreateJobApplicationRequest = {
  company_name: string;
  job_title: string;
  status: string;
  location?: string | null;
  job_url?: string | null;
  notes?: string | null;
  date_applied?: string | null;
};

export type UpdateJobApplicationRequest = {
  company_name?: string;
  job_title?: string;
  status?: string;
  location?: string | null;
  job_url?: string | null;
  notes?: string | null;
  date_applied?: string | null;
};

const API_BASE_URL = "http://127.0.0.1:8000";

export async function getJobApplications(): Promise<JobApplication[]> {
  const response = await fetch(`${API_BASE_URL}/job-applications/`);

  if (!response.ok) throw new Error("Failed to fetch job application");

  return response.json();
}

export async function createJobApplication(
  application: CreateJobApplicationRequest,
) {
  const response = await fetch(`${API_BASE_URL}/job-applications/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(application),
  });

  if (!response.ok) throw new Error("Failed to create job application");

  return response.json();
}

export async function updateJobApplication(
  applicationId: number,
  application: UpdateJobApplicationRequest,
) {
  const response = await fetch(
    `${API_BASE_URL}/job-applications/${applicationId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(application),
    },
  );

  if (!response.ok) throw new Error("Failed to update application");

  return response.json();
}

export async function archiveJobApplication(applicationId: number) {
  const response = await fetch(
    `${API_BASE_URL}/job-applications/${applicationId}/archive`,
    {
      method: "PATCH",
    },
  );

  if (!response.ok)
    throw new Error("Failed to archive the selected job application");

  return response.json();
}
