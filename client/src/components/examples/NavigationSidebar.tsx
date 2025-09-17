import { SidebarProvider } from '@/components/ui/sidebar';
import NavigationSidebar from '../NavigationSidebar';

export default function NavigationSidebarExample() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <div className="bg-background min-h-screen">
      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-screen w-full">
          <NavigationSidebar 
            role="student" 
            currentPath="/student/modules"
            onNavigate={(path) => console.log('Navigate to:', path)}
          />
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-bold mb-4">Content Area</h2>
            <p className="text-muted-foreground">This is where the main content would be displayed.</p>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}