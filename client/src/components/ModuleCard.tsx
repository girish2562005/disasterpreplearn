import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Trophy, Lock, Play } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  isLocked: boolean;
  completedQuizzes: number;
  totalQuizzes: number;
  imageUrl?: string;
  onStart?: () => void;
}

export default function ModuleCard({
  title,
  description,
  duration,
  difficulty,
  progress,
  isLocked,
  completedQuizzes,
  totalQuizzes,
  imageUrl,
  onStart
}: ModuleCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = () => {
    if (isLocked) return <Badge variant="secondary"><Lock className="w-3 h-3 mr-1" />Locked</Badge>;
    if (progress === 100) return <Badge className="bg-green-600"><Trophy className="w-3 h-3 mr-1" />Completed</Badge>;
    if (progress > 0) return <Badge variant="outline">In Progress</Badge>;
    return <Badge variant="outline">Not Started</Badge>;
  };

  return (
    <Card className="hover-elevate group cursor-pointer h-full">
      <CardHeader className="pb-4">
        {imageUrl && (
          <div className="relative h-32 -mx-6 -mt-6 mb-4 rounded-t-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute top-2 right-2">
              {getStatusBadge()}
            </div>
          </div>
        )}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2" data-testid={`text-module-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
              {title}
            </CardTitle>
            <CardDescription className="text-sm mb-3">
              {description}
            </CardDescription>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
              <Badge className={getDifficultyColor(difficulty)}>
                {difficulty}
              </Badge>
            </div>
          </div>
          {!imageUrl && (
            <div className="ml-2">
              {getStatusBadge()}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" data-testid={`progress-${title.replace(/\s+/g, '-').toLowerCase()}`} />
            </div>
          )}
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Quizzes: {completedQuizzes}/{totalQuizzes}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          
          <Button 
            onClick={onStart}
            disabled={isLocked}
            className="w-full"
            variant={progress > 0 ? "default" : "outline"}
            data-testid={`button-start-${title.replace(/\s+/g, '-').toLowerCase()}`}
          >
            <Play className="w-4 h-4 mr-2" />
            {progress === 0 ? 'Start Module' : progress === 100 ? 'Review' : 'Continue'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}