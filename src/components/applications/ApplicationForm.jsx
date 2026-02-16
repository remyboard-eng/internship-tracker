import { useState } from 'react';
import { STATUS_OPTIONS } from '../../constants/status';
import Button from '../ui/Button';

const defaultForm = {
  company: '',
  role: '',
  status: 'saved',
  applicationDate: '',
  deadline: '',
  jobPostingUrl: '',
  notes: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
};

export default function ApplicationForm({ application, onSave, onCancel }) {
  const [form, setForm] = useState(() => {
    if (application) {
      return {
        company: application.company || '',
        role: application.role || '',
        status: application.status || 'saved',
        applicationDate: application.applicationDate || '',
        deadline: application.deadline || '',
        jobPostingUrl: application.jobPostingUrl || '',
        notes: application.notes || '',
        contactName: application.contactName || '',
        contactEmail: application.contactEmail || '',
        contactPhone: application.contactPhone || '',
      };
    }
    return { ...defaultForm };
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!form.company.trim()) newErrors.company = 'Company is required';
    if (!form.role.trim()) newErrors.role = 'Role is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="e.g. Google"
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.company ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="e.g. Software Engineering Intern"
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.role ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {STATUS_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Applied</label>
          <input
            type="date"
            name="applicationDate"
            value={form.applicationDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Job Posting URL</label>
        <input
          type="url"
          name="jobPostingUrl"
          value={form.jobPostingUrl}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any notes about this application..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Contact Info</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              placeholder="Recruiter name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="contactEmail"
              value={form.contactEmail}
              onChange={handleChange}
              placeholder="email@company.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="contactPhone"
              value={form.contactPhone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {application ? 'Save Changes' : 'Add Application'}
        </Button>
      </div>
    </form>
  );
}
