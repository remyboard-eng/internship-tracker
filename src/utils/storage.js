import { supabase } from './supabaseClient';

// ---- READ: direct from Supabase (public via anon key) ----

export async function loadApplications() {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Failed to load applications:', error);
    return [];
  }
  return data.map(snakeToCamel);
}

// ---- WRITE: through API route (username + password protected) ----

export async function apiAddApplication(application, adminUsername, adminPassword) {
  const res = await fetch('/api/applications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-username': adminUsername,
      'x-admin-password': adminPassword,
    },
    body: JSON.stringify(camelToSnake(application)),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to add application');
  }
  return snakeToCamel(await res.json());
}

export async function apiUpdateApplication(id, updates, adminUsername, adminPassword) {
  const res = await fetch('/api/applications', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-username': adminUsername,
      'x-admin-password': adminPassword,
    },
    body: JSON.stringify({ id, ...camelToSnake(updates) }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to update application');
  }
  return snakeToCamel(await res.json());
}

export async function apiDeleteApplication(id, adminUsername, adminPassword) {
  const res = await fetch('/api/applications', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-username': adminUsername,
      'x-admin-password': adminPassword,
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to delete application');
  }
}

// ---- Case conversion (JS camelCase <-> Supabase snake_case) ----

function snakeToCamel(row) {
  return {
    id: row.id,
    company: row.company,
    role: row.role,
    status: row.status,
    applicationDate: row.application_date || '',
    deadline: row.deadline || '',
    jobPostingUrl: row.job_posting_url || '',
    notes: row.notes || '',
    contactName: row.contact_name || '',
    contactEmail: row.contact_email || '',
    contactPhone: row.contact_phone || '',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function camelToSnake(obj) {
  const map = {
    applicationDate: 'application_date',
    jobPostingUrl: 'job_posting_url',
    contactName: 'contact_name',
    contactEmail: 'contact_email',
    contactPhone: 'contact_phone',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  };
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[map[key] || key] = value;
    }
  }
  return result;
}
