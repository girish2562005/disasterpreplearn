import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldCheck, GraduationCap, Users } from 'lucide-react';

interface AuthCardProps {
  onLogin?: (email: string, role: 'admin' | 'teacher' | 'student') => void;
}

export default function AuthCard({ onLogin }: AuthCardProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<'admin' | 'teacher' | 'student'>('student');
  const [signupName, setSignupName] = useState('');

  const handleLogin = () => {
    console.log('Login attempted:', { email: loginEmail, password: loginPassword });
    // For demo purposes, determine role from email domain
    let role: 'admin' | 'teacher' | 'student' = 'student';
    if (loginEmail.includes('admin')) role = 'admin';
    else if (loginEmail.includes('teacher')) role = 'teacher';
    
    onLogin?.(loginEmail, role);
  };

  const handleSignup = () => {
    console.log('Signup attempted:', { email: signupEmail, name: signupName, role: signupRole });
    onLogin?.(signupEmail, signupRole);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <ShieldCheck className="w-4 h-4" />;
      case 'teacher': return <GraduationCap className="w-4 h-4" />;
      case 'student': return <Users className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">DisasterPrep Learn</CardTitle>
        <CardDescription>Access your emergency preparedness training platform</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" data-testid="tab-login">Login</TabsTrigger>
            <TabsTrigger value="signup" data-testid="tab-signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                data-testid="input-login-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                data-testid="input-login-password"
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full"
              data-testid="button-login"
            >
              Sign In
            </Button>
            <div className="text-sm text-muted-foreground text-center">
              Demo: Use admin@test.com, teacher@test.com, or student@test.com
            </div>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name">Full Name</Label>
              <Input
                id="signup-name"
                placeholder="Enter your full name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                data-testid="input-signup-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                data-testid="input-signup-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="Create a password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                data-testid="input-signup-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-role">Role</Label>
              <Select value={signupRole} onValueChange={(value: 'admin' | 'teacher' | 'student') => setSignupRole(value)}>
                <SelectTrigger data-testid="select-signup-role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">
                    <div className="flex items-center gap-2">
                      {getRoleIcon('student')}
                      Student
                    </div>
                  </SelectItem>
                  <SelectItem value="teacher">
                    <div className="flex items-center gap-2">
                      {getRoleIcon('teacher')}
                      Teacher
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      {getRoleIcon('admin')}
                      Administrator
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleSignup} 
              className="w-full"
              data-testid="button-signup"
            >
              Create Account
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}