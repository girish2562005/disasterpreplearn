import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NotFound from "@/pages/not-found";

// Import components
import Hero from "@/components/Hero";
import AuthCard from "@/components/AuthCard";
import NavigationSidebar from "@/components/NavigationSidebar";
import EnhancedDashboard from "@/components/EnhancedDashboard";
import ModuleCard from "@/components/ModuleCard";
import QuizComponent from "@/components/QuizComponent";
import ScenarioChoice from "@/components/ScenarioChoice";
import EmergencySkillsGrid from "@/components/EmergencySkillsGrid";
import AchievementsShowcase from "@/components/AchievementsShowcase";
import ThemeToggle from "@/components/ThemeToggle";
import { LanguageProvider, LanguageSelector, useLanguage } from "@/components/LanguageProvider";
import TeacherDashboard from "@/components/teacher/TeacherDashboard";
import Students from "@/components/teacher/Students";
import CourseContent from "@/components/teacher/CourseContent";
import ProgressReports from "@/components/teacher/ProgressReports";
import Assignments from "@/components/teacher/Assignments";
import Settings from "@/components/teacher/Settings";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminStudents from "@/components/admin/Students";
import AdminCourseContent from "@/components/admin/CourseContent";
import AdminProgressReports from "@/components/admin/ProgressReports";
import AdminAssignments from "@/components/admin/Assignments";
import AdminSettings from "@/components/admin/Settings";

// Import images
import earthquakeImage from '@assets/generated_images/Earthquake_safety_scenario_choices_d6ed01c5.png';
import cprImage from '@assets/generated_images/CPR_training_demonstration_d3252155.png';

// todo: remove mock functionality
const mockQuestions = [
  {
    id: 'q1',
    question: 'What is the correct response when you feel an earthquake starting?',
    options: [
      { id: 'a1', text: 'Run outside immediately', isCorrect: false },
      { id: 'b1', text: 'Drop, Cover, and Hold On', isCorrect: true },
      { id: 'c1', text: 'Stand in a doorway', isCorrect: false },
      { id: 'd1', text: 'Get under a window', isCorrect: false }
    ],
    explanation: 'Drop, Cover, and Hold On is the universally recommended earthquake safety technique.'
  }
];

const mockScenarioOptions = [
  {
    id: 'option1',
    text: 'Run outside immediately to get away from the building',
    isCorrect: false,
    feedback: 'Running outside during shaking is dangerous due to falling objects and debris.'
  },
  {
    id: 'option2',
    text: 'Drop to hands and knees, take cover under the desk, and hold on',
    isCorrect: true,
    feedback: 'Excellent choice! Drop, Cover, and Hold On is the correct earthquake response.'
  }
];

type UserRole = 'admin' | 'teacher' | 'student' | null;

function DisasterPrepApp() {
  const { t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<{ email: string; role: UserRole }>({
    email: '',
    role: null
  });
  const [currentView, setCurrentView] = useState<'hero' | 'auth' | 'dashboard' | 'modules' | 'quiz' | 'scenario' | 'emergency' | 'achievements' | 'teacher-dashboard' | 'teacher-students' | 'teacher-content' | 'teacher-reports' | 'teacher-assignments' | 'teacher-settings' | 'admin-dashboard' | 'admin-students' | 'admin-content' | 'admin-reports' | 'admin-assignments' | 'admin-settings'>('hero');

  const handleLogin = (email: string, role: UserRole) => {
    setCurrentUser({ email, role });
    setCurrentView('dashboard');
    console.log('User logged in:', { email, role });
  };

  const handleLogout = () => {
    setCurrentUser({ email: '', role: null });
    setCurrentView('hero');
  };

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  // Hero/Landing Page
  if (currentView === 'hero') {
    return (
      <div>
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
        <Hero 
          onGetStarted={() => setCurrentView('auth')}
          onLogin={() => setCurrentView('auth')}
        />
      </div>
    );
  }

  // Authentication Page
  if (currentView === 'auth') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
        <div className="absolute top-4 left-4">
          <Button variant="ghost" onClick={() => setCurrentView('hero')}>
            ← {t('common.backToHome')}
          </Button>
        </div>
        <AuthCard onLogin={handleLogin} />
      </div>
    );
  }

  // Authenticated Views
  if (currentUser.role) {
    return (
      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-screen w-full">
          <NavigationSidebar 
            role={currentUser.role}
            onNavigate={(path) => {
              console.log('Navigate to:', path);
              if (path.startsWith('/teacher')) {
                if (path.endsWith('students')) setCurrentView('teacher-students');
                else if (path.endsWith('content')) setCurrentView('teacher-content');
                else if (path.endsWith('reports')) setCurrentView('teacher-reports');
                else if (path.endsWith('assignments')) setCurrentView('teacher-assignments');
                else if (path.endsWith('settings')) setCurrentView('teacher-settings');
                else setCurrentView('teacher-dashboard');
              } else if (path.startsWith('/admin')) {
                if (path.endsWith('users')) setCurrentView('admin-students');
                else if (path.endsWith('content')) setCurrentView('admin-content');
                else if (path.endsWith('analytics') || path.endsWith('reports')) setCurrentView('admin-reports');
                else if (path.endsWith('assignments')) setCurrentView('admin-assignments');
                else if (path.endsWith('settings')) setCurrentView('admin-settings');
                else setCurrentView('admin-dashboard');
              } else {
                if (path.includes('modules')) setCurrentView('modules');
                else if (path.includes('emergency')) setCurrentView('emergency');
                else if (path.includes('scenarios')) setCurrentView('scenario');
                else if (path.includes('achievements')) setCurrentView('achievements');
                else setCurrentView('dashboard');
              }
            }}
          />
          <div className="flex flex-col flex-1">
            <header className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-lg font-semibold">{t('auth.title')}</h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{t(`auth.${currentUser.role}`)}</Badge>
                    <span className="text-sm text-muted-foreground">{currentUser.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LanguageSelector />
                <ThemeToggle />
                <Button variant="outline" onClick={handleLogout}>
                  {t('common.logout')}
                </Button>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-6">
              {currentView === 'dashboard' && (
                <EnhancedDashboard
                  role={currentUser.role}
                  userEmail={currentUser.email}
                  onNavigate={setCurrentView}
                />
              )}

              {currentUser.role === 'teacher' && (
                <>
                  {currentView === 'teacher-dashboard' && <TeacherDashboard />}
                  {currentView === 'teacher-students' && <Students />}
                  {currentView === 'teacher-content' && <CourseContent />}
                  {currentView === 'teacher-reports' && <ProgressReports />}
                  {currentView === 'teacher-assignments' && <Assignments />}
                  {currentView === 'teacher-settings' && <Settings />}
                </>
              )}

              {currentUser.role === 'admin' && (
                <>
                  {currentView === 'admin-dashboard' && <AdminDashboard />}
                  {currentView === 'admin-students' && <AdminStudents />}
                  {currentView === 'admin-content' && <AdminCourseContent />}
                  {currentView === 'admin-reports' && <AdminProgressReports />}
                  {currentView === 'admin-assignments' && <AdminAssignments />}
                  {currentView === 'admin-settings' && <AdminSettings />}
                </>
              )}

              {currentView === 'modules' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Learning Modules</h2>
                    <p className="text-muted-foreground">Choose a module to start your emergency preparedness training.</p>
                  </div>
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
                      onStart={() => setCurrentView('quiz')}
                    />
                    <ModuleCard
                      title="CPR & First Aid"
                      description="Master life-saving CPR techniques and basic first aid procedures."
                      duration="60 minutes"
                      difficulty="intermediate"
                      progress={0}
                      isLocked={false}
                      completedQuizzes={0}
                      totalQuizzes={5}
                      imageUrl={cprImage}
                      onStart={() => setCurrentView('scenario')}
                    />
                    <ModuleCard
                      title="Advanced Emergency Response"
                      description="Comprehensive emergency response protocols for complex disaster scenarios."
                      duration="90 minutes"
                      difficulty="advanced"
                      progress={0}
                      isLocked={true}
                      completedQuizzes={0}
                      totalQuizzes={6}
                      onStart={() => console.log('Module locked')}
                    />
                  </div>
                </div>
              )}

              {currentView === 'quiz' && (
                <div className="space-y-6">
                  <Button variant="outline" onClick={() => setCurrentView('modules')}>
                    ← Back to Modules
                  </Button>
                  <QuizComponent
                    title="Earthquake Safety Quiz"
                    questions={mockQuestions}
                    passingScore={80}
                    onComplete={(score, passed) => console.log('Quiz completed:', { score, passed })}
                  />
                </div>
              )}

              {currentView === 'scenario' && (
                <div className="space-y-6">
                  <Button variant="outline" onClick={() => setCurrentView('modules')}>
                    ← {t('common.backToHome')}
                  </Button>
                  <ScenarioChoice
                    title="Earthquake Response Scenario"
                    description="Interactive emergency preparedness training"
                    imageUrl={earthquakeImage}
                    scenario="You are in a classroom when you suddenly feel the ground shaking. The earthquake is getting stronger and objects are starting to fall from shelves. You and your classmate need to take immediate action to stay safe."
                    options={mockScenarioOptions}
                    onComplete={(option, isCorrect) => console.log('Scenario completed:', { option, isCorrect })}
                  />
                </div>
              )}

              {currentView === 'emergency' && (
                <div className="space-y-6">
                  <Button variant="outline" onClick={() => setCurrentView('dashboard')}>
                    ← {t('nav.dashboard')}
                  </Button>
                  <EmergencySkillsGrid 
                    onSkillStart={(skillId) => {
                      console.log('Starting emergency skill:', skillId);
                      setCurrentView('quiz');
                    }}
                  />
                </div>
              )}

              {currentView === 'achievements' && (
                <div className="space-y-6">
                  <Button variant="outline" onClick={() => setCurrentView('dashboard')}>
                    ← {t('nav.dashboard')}
                  </Button>
                  <AchievementsShowcase />
                </div>
              )}
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return <div>Loading...</div>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={DisasterPrepApp} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Router />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
