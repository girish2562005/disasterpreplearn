import AuthCard from '../AuthCard';

export default function AuthCardExample() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <AuthCard onLogin={(email, role) => console.log('Login:', { email, role })} />
    </div>
  );
}