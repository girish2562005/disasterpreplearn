import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Shield, Users, Trophy } from 'lucide-react';
import heroImage from '@assets/generated_images/Students_learning_emergency_preparedness_77e7a91b.png';

interface HeroProps {
  onGetStarted?: () => void;
  onLogin?: () => void;
}

export default function Hero({ onGetStarted, onLogin }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Students learning emergency preparedness"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <div className="space-y-6">
          {/* Badge */}
          <Badge className="bg-white/10 backdrop-blur text-white border-white/20 hover:bg-white/20">
            <Shield className="w-3 h-3 mr-1" />
            Emergency Preparedness Training Platform
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight" data-testid="text-hero-title">
            Learn to Save Lives with{' '}
            <span className="text-primary-foreground bg-primary/20 px-2 rounded-lg">
              DisasterPrep Learn
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Master essential emergency preparedness and disaster response skills through interactive modules, 
            real-world scenarios, and comprehensive training programs. Be ready when it matters most.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 py-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">10+</div>
              <div className="text-sm text-white/80">Learning Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">1000+</div>
              <div className="text-sm text-white/80">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">95%</div>
              <div className="text-sm text-white/80">Pass Rate</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary-border px-8"
              data-testid="button-get-started"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              onClick={onLogin}
              size="lg" 
              variant="outline"
              className="bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white/20"
              data-testid="button-login"
            >
              <Play className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white/5 backdrop-blur rounded-lg border border-white/10">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Emergency Response</h3>
              <p className="text-sm text-white/80">Learn CPR, first aid, and critical emergency response protocols</p>
            </div>
            
            <div className="text-center p-6 bg-white/5 backdrop-blur rounded-lg border border-white/10">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Interactive Scenarios</h3>
              <p className="text-sm text-white/80">Practice decision-making in realistic emergency situations</p>
            </div>
            
            <div className="text-center p-6 bg-white/5 backdrop-blur rounded-lg border border-white/10">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Achievement System</h3>
              <p className="text-sm text-white/80">Track progress and earn certifications for completed training</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}