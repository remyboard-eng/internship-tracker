import { v4 as uuidv4 } from 'uuid';

// ============================================================
// YOUR APPLICATIONS — Edit this file with your real data!
//
// To update what visitors see on your site:
//   1. Edit the applications below
//   2. Save the file
//   3. Run: git add -A && git commit -m "update applications" && git push
//   4. Vercel auto-deploys in ~30 seconds
//
// Status options: 'saved', 'applied', 'phone_screen', 'interview', 'offer', 'rejected'
// ============================================================

export function getSeedData() {
  const now = new Date();

  function daysAgo(n) {
    const d = new Date(now);
    d.setDate(d.getDate() - n);
    return d.toISOString().split('T')[0];
  }

  function daysFromNow(n) {
    const d = new Date(now);
    d.setDate(d.getDate() + n);
    return d.toISOString().split('T')[0];
  }

  return [
    {
      id: uuidv4(),
      company: 'Google',
      role: 'Software Engineering Intern',
      status: 'interview',
      applicationDate: daysAgo(21),
      deadline: daysFromNow(5),
      jobPostingUrl: 'https://careers.google.com',
      notes: 'Had phone screen, technical interview next week.',
      contactName: 'Sarah Chen',
      contactEmail: 'sarah@google.com',
      contactPhone: '',
      createdAt: new Date(now.getTime() - 21 * 86400000).toISOString(),
      updatedAt: new Date(now.getTime() - 2 * 86400000).toISOString(),
    },
    {
      id: uuidv4(),
      company: 'Microsoft',
      role: 'Product Management Intern',
      status: 'applied',
      applicationDate: daysAgo(14),
      deadline: daysFromNow(10),
      jobPostingUrl: 'https://careers.microsoft.com',
      notes: 'Applied through university career portal.',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      createdAt: new Date(now.getTime() - 14 * 86400000).toISOString(),
      updatedAt: new Date(now.getTime() - 14 * 86400000).toISOString(),
    },
    {
      id: uuidv4(),
      company: 'Stripe',
      role: 'Backend Engineering Intern',
      status: 'phone_screen',
      applicationDate: daysAgo(18),
      deadline: daysFromNow(3),
      jobPostingUrl: 'https://stripe.com/jobs',
      notes: 'Recruiter reached out, phone screen scheduled for this week.',
      contactName: 'Alex Rivera',
      contactEmail: 'alex@stripe.com',
      contactPhone: '(415) 555-0192',
      createdAt: new Date(now.getTime() - 18 * 86400000).toISOString(),
      updatedAt: new Date(now.getTime() - 3 * 86400000).toISOString(),
    },
    {
      id: uuidv4(),
      company: 'Meta',
      role: 'Frontend Engineering Intern',
      status: 'rejected',
      applicationDate: daysAgo(30),
      deadline: '',
      jobPostingUrl: 'https://metacareers.com',
      notes: 'Received rejection email after online assessment.',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      createdAt: new Date(now.getTime() - 30 * 86400000).toISOString(),
      updatedAt: new Date(now.getTime() - 7 * 86400000).toISOString(),
    },
    {
      id: uuidv4(),
      company: 'Apple',
      role: 'iOS Engineering Intern',
      status: 'offer',
      applicationDate: daysAgo(45),
      deadline: '',
      jobPostingUrl: 'https://jobs.apple.com',
      notes: 'Received offer! Decision deadline coming up.',
      contactName: 'Jordan Lee',
      contactEmail: 'jlee@apple.com',
      contactPhone: '',
      createdAt: new Date(now.getTime() - 45 * 86400000).toISOString(),
      updatedAt: new Date(now.getTime() - 1 * 86400000).toISOString(),
    },
    {
      id: uuidv4(),
      company: 'Netflix',
      role: 'Data Science Intern',
      status: 'saved',
      applicationDate: '',
      deadline: daysFromNow(14),
      jobPostingUrl: 'https://jobs.netflix.com',
      notes: 'Application opens next week. Need to prepare resume.',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      company: 'Amazon',
      role: 'SDE Intern',
      status: 'applied',
      applicationDate: daysAgo(7),
      deadline: daysAgo(1),
      jobPostingUrl: 'https://amazon.jobs',
      notes: 'Applied to AWS team specifically.',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      createdAt: new Date(now.getTime() - 7 * 86400000).toISOString(),
      updatedAt: new Date(now.getTime() - 7 * 86400000).toISOString(),
    },
    {
      id: uuidv4(),
      company: 'Figma',
      role: 'Design Engineering Intern',
      status: 'applied',
      applicationDate: daysAgo(10),
      deadline: daysFromNow(20),
      jobPostingUrl: 'https://figma.com/careers',
      notes: 'Included portfolio link in application.',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      createdAt: new Date(now.getTime() - 10 * 86400000).toISOString(),
      updatedAt: new Date(now.getTime() - 10 * 86400000).toISOString(),
    },
  ];
}
