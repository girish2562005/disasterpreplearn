import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Trophy, BookOpen, TrendingUp, Clock, Target, Heart, Shield, 
  Play, Calendar, Star, AlertTriangle, CheckCircle, Zap
} from 'lucide-react';
import DashboardStats from './DashboardStats';
import ModuleCard from './ModuleCard';
import AchievementsShowcase from './AchievementsShowcase';

// Import images
import earthquakeImage from '@assets/generated_images/Earthquake_safety_scenario_choices_d6ed01c5.png';
import cprImage from '@assets/generated_images/CPR_training_demonstration_d3252155.png';
import emergencyImage from '@assets/generated_images/Emergency_medical_skills_illustration_3407c57b.png';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  action: () => void;
}

interface RecentActivity {
  id: string;
  type: 'quiz' | 'module' | 'achievement' | 'scenario';
  title: string;
  timestamp: string;
  score?: number;
  emoji: string;
}

interface UpcomingTask {
  id: string;
  title: string;
  type: 'quiz' | 'module' | 'assignment';
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  progress: number;
}

interface EnhancedDashboardProps {
  role: 'admin' | 'teacher' | 'student';
  userEmail: string;
  onNavigate?: (view: string) => void;
}

export default function EnhancedDashboard({ role, userEmail, onNavigate }: EnhancedDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Quick Actions based on role
  const getQuickActions = (): QuickAction[] => {
    const baseActions = [
      {
        id: 'emergency-quiz',
        title: 'Quick Emergency Quiz',
        description: 'Test your emergency preparedness knowledge',
        icon: AlertTriangle,
        color: 'bg-red-50 text-red-600 border-red-200',
        action: () => onNavigate?.('quiz')
      },
      {
        id: 'practice-scenario',
        title: 'Practice Scenario',
        description: 'Train with real-world emergency situations',
        icon: Play,
        color: 'bg-blue-50 text-blue-600 border-blue-200',
        action: () => onNavigate?.('scenario')
      }
    ];

    if (role === 'student') {
      return [
        ...baseActions,
        {
          id: 'continue-learning',
          title: 'Continue Learning',
          description: 'Resume your current module',
          icon: BookOpen,
          color: 'bg-green-50 text-green-600 border-green-200',
          action: () => onNavigate?.('modules')
        },
        {
          id: 'view-achievements',
          title: 'View Achievements',
          description: 'Check your progress and badges',
          icon: Trophy,
          color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
          action: () => onNavigate?.('achievements')
        }
      ];
    }

    return [
      ...baseActions,
      {
        id: 'student-progress',
        title: 'Student Progress',
        description: 'Monitor student performance',
        icon: Users,
        color: 'bg-purple-50 text-purple-600 border-purple-200',
        action: () => console.log('View student progress')
      },
      {
        id: 'create-assignment',
        title: 'Create Assignment',
        description: 'Design new learning activities',
        icon: Target,
        color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
        action: () => console.log('Create assignment')
      }
    ];
  };

  // Mock recent activities
  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'achievement',
      title: 'Earned CPR Hero Badge',
      timestamp: '2 hours ago',
      emoji: '❤️‍🩹'
    },
    {
      id: '2',
      type: 'quiz',
      title: 'Earthquake Safety Quiz',
      timestamp: '1 day ago',
      score: 92,
      emoji: '🌍'
    },
    {
      id: '3',
      type: 'module',
      title: 'Completed First Aid Basics',
      timestamp: '2 days ago',
      emoji: '🏥'
    },
    {
      id: '4',
      type: 'scenario',
      title: 'Snake Bite Emergency Response',
      timestamp: '3 days ago',
      score: 85,
      emoji: '🐍'
    }
  ];

  // Mock upcoming tasks
  const upcomingTasks: UpcomingTask[] = [
    {
      id: '1',
      title: 'Complete Fire Safety Module',
      type: 'module',
      dueDate: 'Tomorrow',
      priority: 'high',
      progress: 75
    },
    {
      id: '2',
      title: 'Emergency Response Quiz',
      type: 'quiz',
      dueDate: 'In 3 days',
      priority: 'medium',
      progress: 0
    },
    {
      id: '3',
      title: 'CPR Certification Assignment',
      type: 'assignment',
      dueDate: 'Next week',
      priority: 'high',
      progress: 20
    }
  ];

  const quickActions = getQuickActions();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz': return Target;
      case 'module': return BookOpen;
      case 'achievement': return Trophy;
      case 'scenario': return Play;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-muted-foreground">
                {role === 'student' 
                  ? 'Ready to continue your emergency preparedness journey?' 
                  : role === 'teacher'
                  ? 'Monitor student progress and create engaging content'
                  : 'Manage your emergency training platform'}
              </p>
            </div>
            <div className="text-6xl opacity-50">
              {role === 'student' ? '🎓' : role === 'teacher' ? '👨‍🏫' : '👨‍💼'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Actions ⚡</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.id}
                className={`hover-elevate cursor-pointer transition-all duration-200 border-2 ${action.color}`}
                onClick={action.action}
                data-testid={`quick-action-${action.id}`}
              >
                <CardContent className="p-4 text-center">
                  <Icon className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm mb-1">{action.title}</h4>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" data-testid="tab-overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="learning" data-testid="tab-learning">📚 Learning</TabsTrigger>
          <TabsTrigger value="achievements" data-testid="tab-achievements">🏆 Achievements</TabsTrigger>
          <TabsTrigger value="activity" data-testid="tab-activity">📈 Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats */}
          <DashboardStats
            role={role}
            stats={{
              totalUsers: 1247,
              activeStudents: role === 'student' ? undefined : 28,
              completedModules: role === 'student' ? 7 : 156,
              totalModules: role === 'student' ? 10 : undefined,
              averageScore: 84,
              passRate: 89
            }}
            studentProgress={role !== 'student' ? [
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
              }
            ] : undefined}
          />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity 📋
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="text-xl">{activity.emoji}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{activity.title}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          {activity.timestamp}
                          {activity.score && (
                            <Badge variant="outline" className="text-xs">
                              {activity.score}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Tasks 📅
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="p-3 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm">{task.title}</div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{task.dueDate}</div>
                    {task.progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Learning Tab */}
        <TabsContent value="learning" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Continue Learning 🚀</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ModuleCard
                title="Earthquake Safety"
                description="Learn essential earthquake preparedness skills including drop, cover, and hold techniques."
                duration="45 minutes"
                difficulty="beginner"
                progress={75}
                isLocked={false}
                completedQuizzes={3}
                totalQuizzes={4}
                imageUrl={earthquakeImage}
                onStart={() => onNavigate?.('quiz')}
              />
              <ModuleCard
                title="CPR & First Aid"
                description="Master life-saving CPR techniques and basic first aid procedures."
                duration="60 minutes"
                difficulty="intermediate"
                progress={45}
                isLocked={false}
                completedQuizzes={2}
                totalQuizzes={5}
                imageUrl={cprImage}
                onStart={() => onNavigate?.('scenario')}
              />
              <ModuleCard
                title="Emergency Skills"
                description="Comprehensive emergency response for various medical and environmental situations."
                duration="90 minutes"
                difficulty="intermediate"
                progress={20}
                isLocked={false}
                completedQuizzes={1}
                totalQuizzes={6}
                imageUrl={emergencyImage}
                onStart={() => onNavigate?.('emergency')}
              />
            </div>
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <AchievementsShowcase />
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">15</div>
                <div className="text-sm text-muted-foreground">Sessions This Week</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">4.5</div>
                <div className="text-sm text-muted-foreground">Hours Learned</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">12</div>
                <div className="text-sm text-muted-foreground">Quizzes Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">88%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </CardContent>
            </Card>
          </div>

          {/* Learning Streak */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Learning Streak 🔥
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-orange-500">7 Days</div>
                <p className="text-muted-foreground">Keep it up! You're on fire! 🔥</p>
                <div className="flex justify-center gap-2">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      🔥
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}