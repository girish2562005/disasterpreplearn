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
import DashboardStats from "@/components/DashboardStats";
import ModuleCard from "@/components/ModuleCard";
import QuizComponent from "@/components/QuizComponent";
import ScenarioChoice from "@/components/ScenarioChoice";
import ThemeToggle from "@/components/ThemeToggle";

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
  const [currentUser, setCurrentUser] = useState<{ email: string; role: UserRole }>({
    email: '',
    role: null
  });
  const [currentView, setCurrentView] = useState<'hero' | 'auth' | 'dashboard' | 'modules' | 'quiz' | 'scenario'>('hero');

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
        <div className="absolute top-4 right-4 z-50">
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
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="absolute top-4 left-4">
          <Button variant="ghost" onClick={() => setCurrentView('hero')}>
            ← Back to Home
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
              if (path.includes('modules')) setCurrentView('modules');
              else if (path.includes('quiz')) setCurrentView('quiz');
              else if (path.includes('scenarios')) setCurrentView('scenario');
              else setCurrentView('dashboard');
            }}
          />
          <div className="flex flex-col flex-1">
            <header className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-lg font-semibold">DisasterPrep Learn</h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{currentUser.role}</Badge>
                    <span className="text-sm text-muted-foreground">{currentUser.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-6">
              {currentView === 'dashboard' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
                    <p className="text-muted-foreground">Welcome back to your emergency preparedness training.</p>
                  </div>
                  <DashboardStats
                    role={currentUser.role}
                    stats={{
                      totalUsers: 1247,
                      activeStudents: currentUser.role === 'student' ? undefined : 28,
                      completedModules: currentUser.role === 'student' ? 7 : 156,
                      totalModules: currentUser.role === 'student' ? 10 : undefined,
                      averageScore: 84,
                      passRate: 89
                    }}
                    studentProgress={currentUser.role !== 'student' ? [
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
                </div>
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
                    ← Back to Modules
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
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
