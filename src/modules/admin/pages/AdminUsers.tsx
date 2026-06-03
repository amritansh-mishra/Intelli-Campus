import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Mail, MoreVertical } from 'lucide-react';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Table, Column } from '../../../shared/components/Table';
import { adminService } from '../services/adminService';
import { Badge } from '../../../shared/components/Badge';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';

interface UserRow {
  _id: string;
  name: string;
  email: string;
  role: string;
  employeeId?: string;
  studentId?: string;
  year?: number;
  isActive: boolean;
  
  // Advanced ERP Dummy Fields
  semester?: string;
  section?: string;
  attendance?: number;
  department?: string;
  subjects?: string[];
  classes?: string[];
  permissions?: string;
  lastLogin?: string;
  securityStatus?: string;
}

export function AdminUsers({ role, title }: { role?: string; title: string }) {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Function to enrich backend data with ERP dummy fields
  const enrichUserData = (data: any[]) => {
    return data.map((u, i) => {
      const isStudent = u.role === 'student';
      const isTeacher = u.role === 'teacher';
      const isAdmin = u.role === 'admin';

      return {
        ...u,
        semester: isStudent ? `${u.year || 1}th Sem` : undefined,
        section: isStudent ? ['A', 'B', 'C'][i % 3] : undefined,
        attendance: isStudent ? 75 + (i % 25) : undefined,
        department: isStudent || isTeacher ? ['CSE', 'ECE', 'MBA'][i % 3] : 'Administration',
        subjects: isTeacher ? ['Data Structures', 'Algorithms'] : undefined,
        classes: isTeacher ? ['CSE-3A', 'CSE-3B'] : undefined,
        permissions: isAdmin ? 'Full Access' : undefined,
        lastLogin: '2 hours ago',
        securityStatus: 'Secure',
      };
    });
  };

  useEffect(() => {
    setIsLoading(true);
    adminService.getUsers(role)
      .then(({ data }) => setUsers(enrichUserData(data)))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [role]);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.employeeId && u.employeeId.toLowerCase().includes(search.toLowerCase())) ||
    (u.studentId && u.studentId.toLowerCase().includes(search.toLowerCase()))
  );

  const getColumns = (): Column<UserRow>[] => {
    const baseColumns: Column<UserRow>[] = [
      {
        key: 'name',
        header: 'User',
        render: (row) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface border border-line flex items-center justify-center text-sm font-medium text-muted shrink-0">
              {row.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-ink">{row.name}</p>
              <p className="text-xs text-muted flex items-center gap-1">
                <Mail className="w-3 h-3" /> {row.email}
              </p>
            </div>
          </div>
        )
      },
    ];

    if (!role) {
      baseColumns.push({
        key: 'role',
        header: 'Role',
        render: (row) => (
          <Badge variant={row.role === 'admin' ? 'danger' : row.role === 'teacher' ? 'primary' : 'neutral'}>
            {row.role ? row.role.charAt(0).toUpperCase() + row.role.slice(1) : 'Unknown'}
          </Badge>
        ),
      });
      baseColumns.push({
        key: 'department',
        header: 'Department',
        render: (row) => <span className="text-sm text-ink">{row.department || '—'}</span>,
      });
    }

    if (role === 'student') {
      baseColumns.push({
        key: 'academic',
        header: 'Academic Info',
        render: (row) => (
          <div>
            <p className="text-sm text-ink">{row.department}</p>
            <p className="text-xs text-muted">{row.semester} • Section {row.section}</p>
          </div>
        )
      });
      baseColumns.push({
        key: 'attendance',
        header: 'Attendance',
        render: (row) => (
          <div className="flex items-center gap-2">
            <div className="w-16 h-2 bg-surface rounded-full overflow-hidden">
              <div 
                className={`h-full ${row.attendance! >= 85 ? 'bg-success' : row.attendance! >= 75 ? 'bg-primary' : 'bg-danger'}`} 
                style={{ width: `${row.attendance}%` }} 
              />
            </div>
            <span className="text-sm font-medium text-ink">{row.attendance}%</span>
          </div>
        )
      });
    } else if (role === 'teacher') {
      baseColumns.push({
        key: 'department',
        header: 'Department',
        render: (row) => <span className="text-sm text-ink">{row.department}</span>,
      });
      baseColumns.push({
        key: 'workload',
        header: 'Workload',
        render: (row) => (
          <div>
            <p className="text-sm text-ink">{row.subjects?.join(', ')}</p>
            <p className="text-xs text-muted">{row.classes?.join(', ')}</p>
          </div>
        )
      });
    } else if (role === 'admin') {
      baseColumns.push({
        key: 'security',
        header: 'Security',
        render: (row) => (
          <div>
            <p className="text-sm text-ink flex items-center gap-1.5"><Badge variant="success">{row.securityStatus}</Badge></p>
            <p className="text-xs text-muted mt-1">Last login: {row.lastLogin}</p>
          </div>
        )
      });
      baseColumns.push({
        key: 'permissions',
        header: 'Permissions',
        render: (row) => <span className="text-sm font-mono text-muted">{row.permissions}</span>,
      });
    }

    baseColumns.push({
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={row.isActive ? 'success' : 'danger'}>
          {row.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    });

    baseColumns.push({
      key: 'actions',
      header: '',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <Link to={`/admin/users/${row._id}`} className="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors" title="View Profile">
            <Search className="w-4 h-4" />
          </Link>
          <button className="p-1.5 text-muted hover:text-ink hover:bg-surface rounded transition-colors" title="Quick Actions">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      ),
    });

    return baseColumns;
  };

  return (
    <div className="animate-in fade-in duration-500 pb-8 h-full">
      <PageHeader title={title} description={`Manage ${role || 'all'} accounts and system access`} />
      
      <div className="bg-card border border-line rounded-lg shadow-sm mb-6 p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder={`Search ${role || 'user'}s by name, email, or ID...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-line rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <select className="px-3 py-2 border border-line rounded-md text-sm text-ink focus:outline-none focus:border-primary bg-card">
            <option value="">All Departments</option>
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
            <option value="MBA">Business Admin</option>
          </select>
          <Button variant="secondary" className="gap-2 shrink-0">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>
      </div>

      <Table 
        columns={getColumns()} 
        data={filteredUsers} 
        isLoading={isLoading} 
        emptyMessage={`No ${role || 'user'}s found matching your search.`}
      />
    </div>
  );
}

export function AdminTeachers() {
  return <AdminUsers role="teacher" title="Faculty Management" />;
}

export function AdminStudents() {
  return <AdminUsers role="student" title="Student Directory" />;
}
