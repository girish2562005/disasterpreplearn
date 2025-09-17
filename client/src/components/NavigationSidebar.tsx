import { useState } from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  BookOpen, 
  Trophy, 
  Users, 
  Settings, 
  BarChart3, 
  Shield, 
  GraduationCap,
  FileText,
  Target,
  Heart
} from 'lucide-react';

interface NavigationItem {
  title: string;
  url: string;
  icon: any;
  badge?: string;
  isActive?: boolean;
}

interface NavigationSidebarProps {
  role: 'admin' | 'teacher' | 'student';
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export default function NavigationSidebar({ role, currentPath = '/', onNavigate }: NavigationSidebarProps) {
  const [activePath, setActivePath] = useState(currentPath);

  const handleNavigation = (path: string) => {
    setActivePath(path);
    onNavigate?.(path);
    console.log('Navigation:', path);
  };

  const getNavigationItems = (): NavigationItem[] => {
    switch (role) {
      case 'admin':
        return [
          { title: 'Dashboard', url: '/admin', icon: Home },
          { title: 'User Management', url: '/admin/users', icon: Users, badge: '247' },
          { title: 'Content Management', url: '/admin/content', icon: BookOpen },
          { title: 'Analytics', url: '/admin/analytics', icon: BarChart3 },
          { title: 'System Settings', url: '/admin/settings', icon: Settings }
        ];
      case 'teacher':
        return [
          { title: 'Dashboard', url: '/teacher', icon: Home },
          { title: 'My Students', url: '/teacher/students', icon: Users, badge: '28' },
          { title: 'Course Content', url: '/teacher/content', icon: BookOpen },
          { title: 'Progress Reports', url: '/teacher/reports', icon: BarChart3 },
          { title: 'Assignments', url: '/teacher/assignments', icon: FileText, badge: '3' },
          { title: 'Settings', url: '/teacher/settings', icon: Settings }
        ];
      case 'student':
        return [
          { title: 'Dashboard', url: '/student', icon: Home },
          { title: 'Learning Modules', url: '/student/modules', icon: BookOpen, badge: '2 new' },
          { title: 'Emergency Skills', url: '/student/emergency', icon: Heart },
          { title: 'Scenarios', url: '/student/scenarios', icon: Target },
          { title: 'Achievements', url: '/student/achievements', icon: Trophy },
          { title: 'Profile', url: '/student/profile', icon: Settings }
        ];
      default:
        return [];
    }
  };

  const getRoleInfo = () => {
    switch (role) {
      case 'admin':
        return { icon: Shield, label: 'Administrator', color: 'bg-red-100 text-red-800' };
      case 'teacher':
        return { icon: GraduationCap, label: 'Teacher', color: 'bg-blue-100 text-blue-800' };
      case 'student':
        return { icon: Users, label: 'Student', color: 'bg-green-100 text-green-800' };
      default:
        return { icon: Users, label: 'User', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const navigationItems = getNavigationItems();
  const roleInfo = getRoleInfo();
  const RoleIcon = roleInfo.icon;

  return (
    <Sidebar>
      <SidebarContent>
        {/* Header */}
        <SidebarGroup>
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">DisasterPrep Learn</h2>
                <Badge className={roleInfo.color}>
                  <RoleIcon className="w-3 h-3 mr-1" />
                  {roleInfo.label}
                </Badge>
              </div>
            </div>
          </div>
        </SidebarGroup>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = activePath === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      isActive={isActive}
                      onClick={() => handleNavigation(item.url)}
                      data-testid={`nav-${item.title.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats */}
        {role === 'student' && (
          <SidebarGroup>
            <SidebarGroupLabel>Progress</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="p-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Modules Complete</span>
                  <span className="font-medium">7/10</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Average Score</span>
                  <span className="font-medium text-green-600">88%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Achievements</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}