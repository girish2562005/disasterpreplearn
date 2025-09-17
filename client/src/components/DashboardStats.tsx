import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Trophy, BookOpen, TrendingUp, Clock, Target } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: any;
  trend?: 'up' | 'down' | 'neutral';
}

function StatCard({ title, value, change, icon: Icon, trend }: StatCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" data-testid={`stat-${title.replace(/\s+/g, '-').toLowerCase()}`}>
          {value}
        </div>
        {change && (
          <p className={`text-xs ${getTrendColor()}`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface StudentProgressProps {
  name: string;
  email: string;
  completedModules: number;
  totalModules: number;
  averageScore: number;
  lastActive: string;
}

function StudentProgressCard({ name, email, completedModules, totalModules, averageScore, lastActive }: StudentProgressProps) {
  const progress = (completedModules / totalModules) * 100;
  
  return (
    <Card className="hover-elevate">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold" data-testid={`text-student-${name.replace(/\s+/g, '-').toLowerCase()}`}>
              {name}
            </h4>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <Badge variant={averageScore >= 80 ? "default" : averageScore >= 60 ? "secondary" : "destructive"}>
            {averageScore}% avg
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{completedModules}/{totalModules} modules</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Last active: {lastActive}</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-3 h-3" />
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DashboardStatsProps {
  role: 'admin' | 'teacher' | 'student';
  stats: {
    totalUsers?: number;
    activeStudents?: number;
    completedModules?: number;
    averageScore?: number;
    totalModules?: number;
    passRate?: number;
  };
  studentProgress?: StudentProgressProps[];
}

export default function DashboardStats({ role, stats, studentProgress }: DashboardStatsProps) {
  const getStatsForRole = () => {
    switch (role) {
      case 'admin':
        return [
          { title: 'Total Users', value: stats.totalUsers || 0, change: '+12% from last month', icon: Users, trend: 'up' as const },
          { title: 'Active Students', value: stats.activeStudents || 0, change: '+8% from last week', icon: BookOpen, trend: 'up' as const },
          { title: 'Completed Modules', value: stats.completedModules || 0, change: '+15% from last month', icon: Trophy, trend: 'up' as const },
          { title: 'Pass Rate', value: `${stats.passRate || 0}%`, change: '+3% from last month', icon: TrendingUp, trend: 'up' as const }
        ];
      case 'teacher':
        return [
          { title: 'My Students', value: stats.activeStudents || 0, change: '2 new this week', icon: Users, trend: 'up' as const },
          { title: 'Avg Score', value: `${stats.averageScore || 0}%`, change: '+5% improvement', icon: Target, trend: 'up' as const },
          { title: 'Completed Modules', value: stats.completedModules || 0, change: '+20 this week', icon: Trophy, trend: 'up' as const },
          { title: 'Pass Rate', value: `${stats.passRate || 0}%`, change: 'Above target', icon: TrendingUp, trend: 'up' as const }
        ];
      case 'student':
        return [
          { title: 'Completed Modules', value: `${stats.completedModules || 0}/${stats.totalModules || 0}`, icon: BookOpen },
          { title: 'Average Score', value: `${stats.averageScore || 0}%`, icon: Target },
          { title: 'Achievements', value: '12', icon: Trophy },
          { title: 'Study Streak', value: '7 days', icon: TrendingUp }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {getStatsForRole().map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Student Progress (for teachers and admins) */}
      {(role === 'teacher' || role === 'admin') && studentProgress && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Student Progress</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {studentProgress.map((student, index) => (
              <StudentProgressCard key={index} {...student} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}