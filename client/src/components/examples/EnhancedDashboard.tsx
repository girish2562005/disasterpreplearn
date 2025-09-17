import EnhancedDashboard from '../EnhancedDashboard';

export default function EnhancedDashboardExample() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <EnhancedDashboard 
        role="student"
        userEmail="student@example.com"
        onNavigate={(view) => console.log('Navigate to:', view)}
      />
    </div>
  );
}