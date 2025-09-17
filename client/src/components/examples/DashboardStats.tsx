import DashboardStats from '../DashboardStats';

// todo: remove mock functionality
const mockStudentProgress = [
  {
    name: 'Emily Johnson',
    email: 'emily.j@school.edu',
    completedModules: 8,
    totalModules: 10,
    averageScore: 92,
    lastActive: '2 hours ago'
  },
  {
    name: 'Michael Chen',
    email: 'm.chen@school.edu',
    completedModules: 6,
    totalModules: 10,
    averageScore: 78,
    lastActive: '1 day ago'
  },
  {
    name: 'Sarah Williams',
    email: 'sarah.w@school.edu',
    completedModules: 4,
    totalModules: 10,
    averageScore: 65,
    lastActive: '3 days ago'
  }
];

export default function DashboardStatsExample() {
  return (
    <div className="p-6 bg-background space-y-8">
      {/* Admin Dashboard */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <DashboardStats
          role="admin"
          stats={{
            totalUsers: 1247,
            activeStudents: 892,
            completedModules: 3456,
            passRate: 87
          }}
          studentProgress={mockStudentProgress}
        />
      </div>

      {/* Teacher Dashboard */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
        <DashboardStats
          role="teacher"
          stats={{
            activeStudents: 28,
            averageScore: 84,
            completedModules: 156,
            passRate: 89
          }}
          studentProgress={mockStudentProgress}
        />
      </div>

      {/* Student Dashboard */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
        <DashboardStats
          role="student"
          stats={{
            completedModules: 7,
            totalModules: 10,
            averageScore: 88
          }}
        />
      </div>
    </div>
  );
}