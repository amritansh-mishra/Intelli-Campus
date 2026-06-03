import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, BookOpen, Calendar, ArrowRight } from 'lucide-react';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Table, Column } from '../../../shared/components/Table';
import { Button } from '../../../shared/components/Button';
import { departmentService } from '../../../shared/services/campusService';
import { Department } from '../../../types';

interface EnhancedDepartment extends Department {
  facultyCount: number;
  studentCount: number;
  activeEvents: number;
}

export default function AdminDepartments() {
  const [departments, setDepartments] = useState<EnhancedDepartment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = () => {
    setIsLoading(true);
    departmentService.getAll()
      .then(({ data }) => {
        // Mock advanced ERP metrics for departments
        const enhancedData = data.map((dept, i) => ({
          ...dept,
          facultyCount: 20 + (i * 15),
          studentCount: 300 + (i * 120),
          activeEvents: i % 3 + 1,
        }));
        setDepartments(enhancedData as EnhancedDepartment[]);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleRemove = async (id: string) => {
    await departmentService.remove(id);
    load();
  };

  const columns: Column<EnhancedDepartment>[] = [
    {
      key: 'name',
      header: 'Department',
      render: (row) => (
        <div>
          <p className="font-semibold text-ink">{row.name}</p>
          <p className="text-sm font-mono text-muted">{row.code}</p>
        </div>
      )
    },
    {
      key: 'headOfDepartment',
      header: 'HOD',
      render: (row) => (
        <span className="text-sm font-medium text-ink bg-surface px-2.5 py-1 rounded-full border border-line">
          {row.headOfDepartment || 'Not Assigned'}
        </span>
      )
    },
    {
      key: 'stats',
      header: 'Academics',
      render: (row) => (
        <div className="flex flex-col gap-1.5 text-sm text-muted">
          <span className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> {row.facultyCount} Faculty</span>
          <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary" /> {row.studentCount} Students</span>
        </div>
      )
    },
    {
      key: 'events',
      header: 'Engagement',
      render: (row) => (
        <div className="flex items-center gap-2 text-sm text-muted">
          <Calendar className="w-4 h-4 text-warning" />
          <span>{row.activeEvents} Active Events</span>
        </div>
      )
    },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <div className="flex items-center justify-end gap-3">
          <button 
            onClick={() => handleRemove(row._id as string)}
            className="text-sm font-medium text-danger hover:text-red-700 transition-colors"
          >
            Remove
          </button>
          <Link to={`/admin/departments/analytics`} className="p-1.5 text-primary hover:bg-primary/10 rounded transition-colors" title="View Analytics">
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 pb-8 h-full">
      <PageHeader 
        title="Department Management" 
        description="View and manage academic departments and administrative branches." 
        action={
          <Link to="/admin/departments/add">
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> New Department
            </Button>
          </Link>
        }
      />

      <div className="bg-card border border-line rounded-lg shadow-sm">
        <Table 
          columns={columns} 
          data={departments} 
          isLoading={isLoading} 
          emptyMessage="No departments configured." 
        />
      </div>
    </div>
  );
}
