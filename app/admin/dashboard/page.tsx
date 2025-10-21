'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Types based on schema
interface Lead {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  gender?: string;
  dob?: string;
  state?: string;
  city?: string;
  employmentStatus?: string;
  salaryBand?: string;
  highestQualification?: string;
  lastScorePercent?: string;
  degreeInterest?: string;
  coursePreference?: string;
  specialisationInterest?: string;
  goal?: string;
  budgetRange?: string;
  wantsEmi?: boolean;
  category?: string;
  experienceYears?: string;
  preferredMode?: string;
  status: string;
  notes?: string;
  consentedAt: string;
  source?: string;
  utmCampaign?: string;
}

interface Institution {
  id: number;
  name: string;
  slug: string;
  location?: string;
  accreditation?: string;
  website?: string;
  heroImage?: string;
  logoUrl?: string;
  establishedYear?: number;
  shortDescription?: string;
  createdAt: string;
  updatedAt: string;
}

interface Program {
  id: number;
  institutionId: number;
  institutionName?: string;
  degreeType: string;
  title: string;
  durationMonths?: number;
  deliveryMode?: string;
  totalFee?: number;
  applicationFee?: number;
  emiAvailable?: boolean;
  highlights?: string;
  outcomes?: string;
  eligibility?: string;
  curriculum?: string;
  workExperienceMinYears?: number;
  isFeatured?: boolean;
  brochureUrl?: string;
  heroImage?: string;
  applyUrl?: string;
  applicationDeadline?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [adminEmail, setAdminEmail] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Modal states
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showInstitutionModal, setShowInstitutionModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  // Form states for add/edit
  const [programForm, setProgramForm] = useState<Partial<Program>>({});
  const [institutionForm, setInstitutionForm] = useState<Partial<Institution>>({});

  // Search and filter states
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');
  const [programSearch, setProgramSearch] = useState('');
  const [institutionSearch, setInstitutionSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminAuthToken');
    const email = localStorage.getItem('adminEmail');

    if (!token) {
      router.push('/admin');
    } else {
      setAdminEmail(email || '');
    }
  }, [router]);

  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeads();
    } else if (activeTab === 'programs') {
      fetchPrograms();
    } else if (activeTab === 'institutions') {
      fetchInstitutions();
    }
  }, [activeTab]);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        await fetchLeads({ skipLoading: true });
        await fetchPrograms({ skipLoading: true });
        await fetchInstitutions({ skipLoading: true });
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  const fetchLeads = async ({ skipLoading = false }: { skipLoading?: boolean } = {}) => {
    if (!skipLoading) {
      setLoading(true);
    }
    try {
      const response = await fetch('/api/admin/leads');
      if (response.ok) {
        const data = (await response.json()) as Lead[];
        setLeads(data);
      } else {
        const { error } = (await response.json().catch(() => ({}))) as { error?: string };
        console.error('Failed to fetch leads:', error);
        setLeads([]);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLeads([]);
    } finally {
      if (!skipLoading) {
        setLoading(false);
      }
    }
  };

  const fetchPrograms = async ({ skipLoading = false }: { skipLoading?: boolean } = {}) => {
    if (!skipLoading) {
      setLoading(true);
    }
    try {
      const response = await fetch('/api/admin/programs');
      if (response.ok) {
        const data = (await response.json()) as Program[];
        setPrograms(data);
      } else {
        const { error } = (await response.json().catch(() => ({}))) as { error?: string };
        console.error('Failed to fetch programs:', error);
        setPrograms([]);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
      setPrograms([]);
    } finally {
      if (!skipLoading) {
        setLoading(false);
      }
    }
  };

  const fetchInstitutions = async ({ skipLoading = false }: { skipLoading?: boolean } = {}) => {
    if (!skipLoading) {
      setLoading(true);
    }
    try {
      const response = await fetch('/api/admin/institutions');
      if (response.ok) {
        const data = (await response.json()) as Institution[];
        setInstitutions(data);
      } else {
        const { error } = (await response.json().catch(() => ({}))) as { error?: string };
        console.error('Failed to fetch institutions:', error);
        setInstitutions([]);
      }
    } catch (error) {
      console.error('Error fetching institutions:', error);
      setInstitutions([]);
    } finally {
      if (!skipLoading) {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken');
    localStorage.removeItem('adminEmail');
    router.push('/admin');
  };

  const handleUpdateLeadStatus = async (leadId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchLeads();
      } else {
        const { error } = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(error || 'Failed to update lead');
      }
    } catch (error) {
      console.error('Error updating lead:', error);
      alert(error instanceof Error ? error.message : 'Failed to update lead.');
    }
  };

  const handleDeleteLead = async (leadId: number) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchLeads();
      } else {
        const { error } = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(error || 'Failed to delete lead');
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete lead.');
    }
  };

  const handleDeleteProgram = async (programId: number) => {
    if (!confirm('Are you sure you want to delete this program?')) return;
    try {
      const response = await fetch(`/api/admin/programs/${programId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPrograms();
      } else {
        const { error } = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(error || 'Failed to delete program');
      }
    } catch (error) {
      console.error('Error deleting program:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete program.');
    }
  };

  const handleDeleteInstitution = async (institutionId: number) => {
    if (!confirm('Are you sure you want to delete this institution? This will also delete all associated programs.')) return;
    try {
      const response = await fetch(`/api/admin/institutions/${institutionId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchInstitutions();
      } else {
        const { error } = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(error || 'Failed to delete institution');
      }
    } catch (error) {
      console.error('Error deleting institution:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete institution.');
    }
  };

  const handleExportLeads = () => {
    const csv = [
      ['ID', 'Name', 'Email', 'Phone', 'Status', 'Degree Interest', 'Salary Band', 'Experience', 'Date'].join(','),
      ...filteredLeads.map(lead => [
        lead.id,
        lead.fullName,
        lead.email,
        lead.phone,
        lead.status,
        lead.degreeInterest || '',
        lead.salaryBand || '',
        lead.experienceYears || '',
        new Date(lead.consentedAt).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Helpers: open modal and initialize forms
  const openAddProgram = () => {
    setSelectedProgram(null);
    setProgramForm({
      degreeType: 'MBA',
      title: '',
      institutionId: institutions[0]?.id,
      durationMonths: 24,
      deliveryMode: 'online',
      totalFee: 0,
      applicationFee: 0,
      emiAvailable: false,
      highlights: '',
      eligibility: '',
      isFeatured: false,
    });
    setShowProgramModal(true);
  };

  const openEditProgram = (program: Program) => {
    setSelectedProgram(program);
    setProgramForm({ ...program });
    setShowProgramModal(true);
  };

  const openAddInstitution = () => {
    setSelectedInstitution(null);
    setInstitutionForm({
      name: '',
      slug: '',
      location: '',
      accreditation: '',
      website: '',
      establishedYear: new Date().getFullYear(),
      shortDescription: '',
    });
    setShowInstitutionModal(true);
  };

  const openEditInstitution = (inst: Institution) => {
    setSelectedInstitution(inst);
    setInstitutionForm({ ...inst });
    setShowInstitutionModal(true);
  };

  const handleCreateOrUpdateProgram = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const { institutionName, createdAt, updatedAt, id, ...rest } = programForm;
      const payload = {
        ...rest,
        institutionId: rest.institutionId,
      };

      if (!payload.institutionId) {
        throw new Error('Please select an institution before saving a program.');
      }

      let response: Response;

      if (selectedProgram) {
        response = await fetch(`/api/admin/programs/${selectedProgram.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch('/api/admin/programs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const { error } = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(error || 'Unable to save program');
      }

      await fetchPrograms();
      setShowProgramModal(false);
    } catch (err) {
      console.error('Error saving program:', err);
      alert(err instanceof Error ? err.message : 'Unable to save program');
    }
  };

  const handleCreateOrUpdateInstitution = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      const { id, createdAt, updatedAt, ...rest } = institutionForm;
      const payload = { ...rest };

      if (!payload.name || !payload.slug) {
        throw new Error('Name and slug are required.');
      }

      if (selectedInstitution) {
        const response = await fetch(`/api/admin/institutions/${selectedInstitution.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const { error } = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(error || 'Unable to update institution');
        }
      } else {
        const response = await fetch('/api/admin/institutions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const { error } = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(error || 'Unable to create institution');
        }
      }
      await fetchInstitutions();
      setShowInstitutionModal(false);
    } catch (err) {
      console.error('Error saving institution:', err);
      alert(err instanceof Error ? err.message : 'Unable to save institution');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'qualified': return 'bg-purple-100 text-purple-700';
      case 'converted': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const totalLeads = leads.length;
  const convertedLeads = leads.filter((lead) => lead.status === 'converted').length;
  const conversionRate = totalLeads > 0 ? `${((convertedLeads / totalLeads) * 100).toFixed(1)}%` : '0%';

  const stats = [
    { label: 'Total Leads', value: totalLeads.toString(), change: '—', icon: '👥', color: 'bg-blue-500' },
    { label: 'Active Programs', value: programs.length.toString(), change: '—', icon: '🎓', color: 'bg-teal-500' },
    { label: 'Partner Institutions', value: institutions.length.toString(), change: '—', icon: '🏛️', color: 'bg-purple-500' },
    { label: 'Conversion Rate', value: conversionRate, change: '—', icon: '📈', color: 'bg-emerald-500' },
  ];

  const recentLeads = leads.slice(0, 5);

  // Filtered data
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.fullName.toLowerCase().includes(leadSearch.toLowerCase()) ||
                         lead.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
                         lead.phone.includes(leadSearch);
    const matchesStatus = leadStatusFilter === 'all' || lead.status === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredPrograms = programs.filter(program =>
    program.title.toLowerCase().includes(programSearch.toLowerCase()) ||
    program.degreeType.toLowerCase().includes(programSearch.toLowerCase()) ||
    program.institutionName?.toLowerCase().includes(programSearch.toLowerCase())
  );

  const filteredInstitutions = institutions.filter(institution =>
    institution.name.toLowerCase().includes(institutionSearch.toLowerCase()) ||
    institution.location?.toLowerCase().includes(institutionSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">U</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900">Upskillers</div>
                  <div className="text-xs text-slate-500">Admin Panel</div>
                </div>
              </Link>

              <div className="hidden md:flex gap-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'overview'
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'leads'
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Leads
                </button>
                <button
                  onClick={() => setActiveTab('programs')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'programs'
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Programs
                </button>
                <button
                  onClick={() => setActiveTab('institutions')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'institutions'
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Institutions
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-slate-900">Admin User</div>
                <div className="text-xs text-slate-500">{adminEmail}</div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-2xl`}>
                      {stat.icon}
                    </div>
                    <span className="text-sm font-semibold text-emerald-600">{stat.change}</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Leads */}
            <div className="bg-white rounded-2xl border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">Recent Leads</h2>
                  <button 
                    onClick={() => setActiveTab('leads')}
                    className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                  >
                    View all →
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {recentLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">{lead.fullName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600">{lead.email}</div>
                          <div className="text-xs text-slate-500">{lead.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {new Date(lead.consentedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => {
                              setSelectedLead(lead);
                              setShowLeadModal(true);
                            }}
                            className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Add New Program</h3>
                <p className="text-sm opacity-90 mb-4">Create a new program listing</p>
                <button 
                  onClick={() => {
                    setSelectedProgram(null);
                    setShowProgramModal(true);
                  }}
                  className="bg-white text-teal-600 px-4 py-2 rounded-lg font-semibold hover:bg-slate-100 transition-all"
                >
                  Add Program
                </button>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Export Leads</h3>
                <p className="text-sm opacity-90 mb-4">Download leads data as CSV</p>
                <button 
                  onClick={handleExportLeads}
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-slate-100 transition-all"
                >
                  Export Data
                </button>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Add Institution</h3>
                <p className="text-sm opacity-90 mb-4">Register new partner</p>
                <button 
                  onClick={() => {
                    setSelectedInstitution(null);
                    setShowInstitutionModal(true);
                  }}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-slate-100 transition-all"
                >
                  Add Partner
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Leads Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">All Leads</h2>
                  <p className="text-slate-600 text-sm mt-1">
                    {filteredLeads.length} total leads
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleExportLeads}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-all"
                  >
                    📥 Export CSV
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="mt-6 flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                </select>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {loading ? (
                <div className="p-12 text-center text-slate-500">Loading...</div>
              ) : filteredLeads.length === 0 ? (
                <div className="p-12 text-center text-slate-500">No leads found</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Interest</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Experience</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 text-sm text-slate-600">#{lead.id}</td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-slate-900">{lead.fullName}</div>
                            <div className="text-xs text-slate-500">{lead.city}, {lead.state}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-600">{lead.email}</div>
                            <div className="text-xs text-slate-500">{lead.phone}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-slate-900">{lead.degreeInterest}</div>
                            <div className="text-xs text-slate-500">{lead.specialisationInterest}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {lead.experienceYears} years
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(lead.status)} cursor-pointer`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="converted">Converted</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {new Date(lead.consentedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setSelectedLead(lead);
                                  setShowLeadModal(true);
                                }}
                                className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="text-red-600 hover:text-red-700 font-medium text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="space-y-6">
            {/* Programs Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Programs</h2>
                  <p className="text-slate-600 text-sm mt-1">
                    {filteredPrograms.length} total programs
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedProgram(null);
                    setShowProgramModal(true);
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-all"
                >
                  ➕ Add Program
                </button>
              </div>

              {/* Search */}
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Search programs by title, type, or institution..."
                  value={programSearch}
                  onChange={(e) => setProgramSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Programs Grid */}
            {loading ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                Loading...
              </div>
            ) : filteredPrograms.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                No programs found
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPrograms.map((program) => (
                  <div key={program.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
                          {program.degreeType}
                        </span>
                        {program.isFeatured && (
                          <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedProgram(program);
                            setShowProgramModal(true);
                          }}
                          className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProgram(program.id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">{program.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">{program.institutionName}</p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <div className="text-xs text-slate-500">Duration</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {program.durationMonths} months
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Mode</div>
                        <div className="text-sm font-semibold text-slate-900 capitalize">
                          {program.deliveryMode}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Total Fee</div>
                        <div className="text-sm font-semibold text-slate-900">
                          ₹{program.totalFee?.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">EMI</div>
                        <div className="text-sm font-semibold text-slate-900">
                          {program.emiAvailable ? '✅ Available' : '❌ No'}
                        </div>
                      </div>
                    </div>

                    {program.highlights && (
                      <p className="text-sm text-slate-600 line-clamp-2">{program.highlights}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'institutions' && (
          <div className="space-y-6">
            {/* Institutions Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Institutions</h2>
                  <p className="text-slate-600 text-sm mt-1">
                    {filteredInstitutions.length} partner institutions
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedInstitution(null);
                    setShowInstitutionModal(true);
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-all"
                >
                  ➕ Add Institution
                </button>
              </div>

              {/* Search */}
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Search institutions by name or location..."
                  value={institutionSearch}
                  onChange={(e) => setInstitutionSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Institutions Grid */}
            {loading ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                Loading...
              </div>
            ) : filteredInstitutions.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                No institutions found
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInstitutions.map((institution) => (
                  <div key={institution.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{institution.name}</h3>
                        <p className="text-sm text-slate-600">{institution.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedInstitution(institution);
                            setShowInstitutionModal(true);
                          }}
                          className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteInstitution(institution.id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {institution.accreditation && (
                      <div className="mb-3">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                          {institution.accreditation}
                        </span>
                      </div>
                    )}

                    {institution.shortDescription && (
                      <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                        {institution.shortDescription}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                      <div className="text-xs text-slate-500">
                        Est. {institution.establishedYear}
                      </div>
                      {institution.website && (
                        <a
                          href={institution.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:text-teal-700 text-xs font-medium"
                        >
                          Visit Website →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {showLeadModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-2xl font-bold text-slate-900">Lead Details</h3>
              <button
                onClick={() => setShowLeadModal(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Full Name</label>
                  <p className="text-slate-900 font-medium">{selectedLead.fullName}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Gender</label>
                  <p className="text-slate-900">{selectedLead.gender || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Email</label>
                  <p className="text-slate-900">{selectedLead.email}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Phone</label>
                  <p className="text-slate-900">{selectedLead.phone}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">City, State</label>
                  <p className="text-slate-900">{selectedLead.city}, {selectedLead.state}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Employment Status</label>
                  <p className="text-slate-900">{selectedLead.employmentStatus}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Salary Band</label>
                  <p className="text-slate-900">{selectedLead.salaryBand}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Experience</label>
                  <p className="text-slate-900">{selectedLead.experienceYears} years</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Highest Qualification</label>
                  <p className="text-slate-900">{selectedLead.highestQualification}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Last Score</label>
                  <p className="text-slate-900">{selectedLead.lastScorePercent}%</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Degree Interest</label>
                  <p className="text-slate-900 font-medium">{selectedLead.degreeInterest}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Course Preference</label>
                  <p className="text-slate-900">{selectedLead.coursePreference}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Specialisation</label>
                  <p className="text-slate-900">{selectedLead.specialisationInterest}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Goal</label>
                  <p className="text-slate-900">{selectedLead.goal}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Budget Range</label>
                  <p className="text-slate-900">{selectedLead.budgetRange}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">EMI Interest</label>
                  <p className="text-slate-900">{selectedLead.wantsEmi ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Preferred Mode</label>
                  <p className="text-slate-900 capitalize">{selectedLead.preferredMode}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Status</label>
                  <p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedLead.status)}`}>
                      {selectedLead.status}
                    </span>
                  </p>
                </div>
              </div>
              {selectedLead.notes && (
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Notes</label>
                  <p className="text-slate-900 mt-1">{selectedLead.notes}</p>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowLeadModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDeleteLead(selectedLead.id);
                    setShowLeadModal(false);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all"
                >
                  Delete Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Program Modal (Add/Edit) */}
      {showProgramModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleCreateOrUpdateProgram} className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-2xl font-bold text-slate-900">{selectedProgram ? 'Edit Program' : 'Add New Program'}</h3>
              <button type="button" onClick={() => setShowProgramModal(false)} className="text-slate-500 hover:text-slate-700">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Title</label>
                  <input value={programForm.title || ''} onChange={(e) => setProgramForm(f => ({ ...f, title: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Degree Type</label>
                  <input value={programForm.degreeType || ''} onChange={(e) => setProgramForm(f => ({ ...f, degreeType: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Institution</label>
                  <select
                    value={programForm.institutionId ?? ''}
                    onChange={(e) => setProgramForm(f => ({ ...f, institutionId: Number(e.target.value) }))}
                    className="mt-1 w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    {institutions.length === 0 ? (
                      <option value="" disabled>
                        No institutions available
                      </option>
                    ) : (
                      institutions.map((institution) => (
                        <option key={institution.id} value={institution.id}>
                          {institution.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Delivery Mode</label>
                  <select value={programForm.deliveryMode || 'online'} onChange={(e) => setProgramForm(f => ({ ...f, deliveryMode: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg">
                    <option value="online">Online</option>
                    <option value="blended">Blended</option>
                    <option value="weekend">Weekend</option>
                    <option value="on-campus">On-campus</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Duration (months)</label>
                  <input type="number" value={programForm.durationMonths || 24} onChange={(e) => setProgramForm(f => ({ ...f, durationMonths: Number(e.target.value) }))} className="mt-1 w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Total Fee (₹)</label>
                  <input type="number" value={programForm.totalFee || 0} onChange={(e) => setProgramForm(f => ({ ...f, totalFee: Number(e.target.value) }))} className="mt-1 w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Application Fee (₹)</label>
                  <input type="number" value={programForm.applicationFee || 0} onChange={(e) => setProgramForm(f => ({ ...f, applicationFee: Number(e.target.value) }))} className="mt-1 w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Highlights</label>
                <textarea value={programForm.highlights || ''} onChange={(e) => setProgramForm(f => ({ ...f, highlights: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" rows={3} />
              </div>

              <div className="flex items-center gap-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" checked={!!programForm.emiAvailable} onChange={(e) => setProgramForm(f => ({ ...f, emiAvailable: e.target.checked }))} />
                  <span className="ml-2 text-sm text-slate-700">EMI Available</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" checked={!!programForm.isFeatured} onChange={(e) => setProgramForm(f => ({ ...f, isFeatured: e.target.checked }))} />
                  <span className="ml-2 text-sm text-slate-700">Featured</span>
                </label>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setShowProgramModal(false)} className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg">{selectedProgram ? 'Save Changes' : 'Create Program'}</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Institution Modal (Add/Edit) */}
      {showInstitutionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleCreateOrUpdateInstitution} className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-2xl font-bold text-slate-900">{selectedInstitution ? 'Edit Institution' : 'Add New Institution'}</h3>
              <button type="button" onClick={() => setShowInstitutionModal(false)} className="text-slate-500 hover:text-slate-700">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input value={institutionForm.name || ''} onChange={(e) => setInstitutionForm(f => ({ ...f, name: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Slug</label>
                  <input value={institutionForm.slug || ''} onChange={(e) => setInstitutionForm(f => ({ ...f, slug: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Location</label>
                  <input value={institutionForm.location || ''} onChange={(e) => setInstitutionForm(f => ({ ...f, location: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Website</label>
                  <input value={institutionForm.website || ''} onChange={(e) => setInstitutionForm(f => ({ ...f, website: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Established Year</label>
                  <input type="number" value={institutionForm.establishedYear || new Date().getFullYear()} onChange={(e) => setInstitutionForm(f => ({ ...f, establishedYear: Number(e.target.value) }))} className="mt-1 w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Short Description</label>
                <textarea value={institutionForm.shortDescription || ''} onChange={(e) => setInstitutionForm(f => ({ ...f, shortDescription: e.target.value }))} className="mt-1 w-full px-3 py-2 border rounded-lg" rows={3} />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setShowInstitutionModal(false)} className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg">{selectedInstitution ? 'Save Changes' : 'Create Institution'}</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
