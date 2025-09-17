import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Medal, Award, Sparkles, Zap, Shield, Heart } from 'lucide-react';
import badgesImage from '@assets/generated_images/Achievement_badges_collection_ab8bf2c4.png';

interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: 'medical' | 'disaster' | 'safety' | 'special';
  progress: number;
  isUnlocked: boolean;
  dateEarned?: string;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementsShowcaseProps {
  userAchievements?: Achievement[];
  totalXP?: number;
  currentLevel?: number;
}

const defaultAchievements: Achievement[] = [
  {
    id: 'first-aid-expert',
    title: 'First Aid Expert',
    description: 'Complete all basic first aid modules with 90%+ score',
    emoji: '🏥',
    category: 'medical',
    progress: 100,
    isUnlocked: true,
    dateEarned: '2024-03-15',
    xpReward: 500,
    rarity: 'epic'
  },
  {
    id: 'cpr-hero',
    title: 'CPR Hero',
    description: 'Master CPR techniques and save a virtual life',
    emoji: '❤️‍🩹',
    category: 'medical',
    progress: 100,
    isUnlocked: true,
    dateEarned: '2024-03-10',
    xpReward: 750,
    rarity: 'legendary'
  },
  {
    id: 'earthquake-survivor',
    title: 'Earthquake Survivor',
    description: 'Complete earthquake safety training with perfect score',
    emoji: '🌍',
    category: 'disaster',
    progress: 100,
    isUnlocked: true,
    dateEarned: '2024-03-08',
    xpReward: 600,
    rarity: 'epic'
  },
  {
    id: 'fire-safety-champion',
    title: 'Fire Safety Champion',
    description: 'Pass all fire safety scenarios without mistakes',
    emoji: '🔥',
    category: 'safety',
    progress: 75,
    isUnlocked: false,
    xpReward: 400,
    rarity: 'rare'
  },
  {
    id: 'snake-bite-specialist',
    title: 'Snake Bite Specialist',
    description: 'Learn proper snake bite emergency response',
    emoji: '🐍',
    category: 'medical',
    progress: 60,
    isUnlocked: false,
    xpReward: 350,
    rarity: 'rare'
  },
  {
    id: 'emergency-kit-master',
    title: 'Emergency Kit Master',
    description: 'Create the perfect emergency preparedness kit',
    emoji: '🎒',
    category: 'safety',
    progress: 40,
    isUnlocked: false,
    xpReward: 300,
    rarity: 'common'
  },
  {
    id: 'quick-response-award',
    title: 'Quick Response Award',
    description: 'Complete 5 emergency scenarios in under 2 minutes each',
    emoji: '⚡',
    category: 'special',
    progress: 80,
    isUnlocked: false,
    xpReward: 800,
    rarity: 'legendary'
  },
  {
    id: 'bee-sting-helper',
    title: 'Bee Sting Helper',
    description: 'Master bee sting treatment and allergy response',
    emoji: '🐝',
    category: 'medical',
    progress: 90,
    isUnlocked: false,
    xpReward: 250,
    rarity: 'common'
  },
  {
    id: 'perfect-student',
    title: 'Perfect Student',
    description: 'Score 100% on 10 consecutive quizzes',
    emoji: '🌟',
    category: 'special',
    progress: 30,
    isUnlocked: false,
    xpReward: 1000,
    rarity: 'legendary'
  }
];

export default function AchievementsShowcase({ 
  userAchievements = defaultAchievements,
  totalXP = 2850,
  currentLevel = 7
}: AchievementsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [animatingAchievement, setAnimatingAchievement] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All', icon: Trophy, color: 'text-primary' },
    { id: 'medical', name: 'Medical', icon: Heart, color: 'text-red-500' },
    { id: 'disaster', name: 'Disaster', icon: Shield, color: 'text-blue-500' },
    { id: 'safety', name: 'Safety', icon: Zap, color: 'text-yellow-500' },
    { id: 'special', name: 'Special', icon: Star, color: 'text-purple-500' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRarityGlow = (rarity: string, isUnlocked: boolean) => {
    if (!isUnlocked) return '';
    switch (rarity) {
      case 'epic': return 'shadow-lg shadow-purple-200 dark:shadow-purple-900/50';
      case 'legendary': return 'shadow-xl shadow-yellow-200 dark:shadow-yellow-900/50';
      default: return '';
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? userAchievements 
    : userAchievements.filter(a => a.category === selectedCategory);

  const unlockedCount = userAchievements.filter(a => a.isUnlocked).length;
  const nextLevelXP = (currentLevel + 1) * 500;
  const currentLevelProgress = (totalXP % 500) / 500 * 100;

  const triggerAnimation = (achievementId: string) => {
    setAnimatingAchievement(achievementId);
    setTimeout(() => setAnimatingAchievement(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header with Level Progress */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="text-6xl mb-2">🏆</div>
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            {currentLevel}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2" data-testid="text-achievements-title">
            Your Achievements ✨
          </h2>
          <p className="text-muted-foreground mb-4">
            Celebrate your emergency preparedness milestones! 🎉
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Trophy className="w-4 h-4 mr-2" />
              {unlockedCount}/{userAchievements.length} Unlocked
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              {totalXP} XP
            </Badge>
          </div>
        </div>
        
        {/* Level Progress */}
        <Card className="max-w-md mx-auto">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Level {currentLevel}</span>
              <span className="text-sm text-muted-foreground">{totalXP}/{nextLevelXP} XP</span>
            </div>
            <Progress value={currentLevelProgress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {nextLevelXP - totalXP} XP until Level {currentLevel + 1}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          return (
            <Button
              key={category.id}
              variant={isActive ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="gap-2"
              data-testid={`button-category-${category.id}`}
            >
              <Icon className={`w-4 h-4 ${category.color}`} />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => {
          const isAnimating = animatingAchievement === achievement.id;
          return (
            <Card 
              key={achievement.id}
              className={`relative overflow-hidden hover-elevate transition-all duration-300 ${
                achievement.isUnlocked 
                  ? `${getRarityGlow(achievement.rarity, true)} border-2` 
                  : 'opacity-60'
              } ${isAnimating ? 'animate-pulse scale-105' : ''}`}
              onClick={() => achievement.isUnlocked && triggerAnimation(achievement.id)}
              data-testid={`card-achievement-${achievement.id}`}
            >
              {/* Rarity Border */}
              {achievement.isUnlocked && achievement.rarity !== 'common' && (
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  achievement.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                  achievement.rarity === 'epic' ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
                  'bg-gradient-to-r from-blue-400 to-cyan-400'
                }`} />
              )}

              <CardHeader className="text-center pb-2">
                <div className="text-4xl mb-2 relative">
                  {achievement.emoji}
                  {achievement.isUnlocked && (
                    <div className="absolute -top-1 -right-1">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg">{achievement.title}</CardTitle>
                <CardDescription className="text-sm">{achievement.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{achievement.progress}%</span>
                  </div>
                  <Progress 
                    value={achievement.progress} 
                    className={`h-2 ${achievement.isUnlocked ? 'progress-glow' : ''}`}
                  />
                </div>

                {/* Details */}
                <div className="flex items-center justify-between">
                  <Badge className={getRarityColor(achievement.rarity)}>
                    {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-3 h-3" />
                    <span>{achievement.xpReward} XP</span>
                  </div>
                </div>

                {achievement.isUnlocked && achievement.dateEarned && (
                  <div className="text-xs text-muted-foreground text-center">
                    🎉 Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
                  </div>
                )}

                {!achievement.isUnlocked && achievement.progress < 100 && (
                  <div className="text-xs text-center text-muted-foreground">
                    {100 - achievement.progress}% remaining to unlock
                  </div>
                )}
              </CardContent>

              {/* Sparkle Animation for Legendary */}
              {achievement.isUnlocked && achievement.rarity === 'legendary' && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-2 left-2 text-yellow-400 animate-bounce">✨</div>
                  <div className="absolute top-4 right-3 text-yellow-300 animate-bounce delay-100">⭐</div>
                  <div className="absolute bottom-3 left-3 text-yellow-500 animate-bounce delay-200">💫</div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Recent Achievements */}
      {unlockedCount > 0 && (
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Medal className="w-5 h-5" />
              Recent Achievements 🎊
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userAchievements
                .filter(a => a.isUnlocked)
                .slice(-3)
                .map((achievement) => (
                  <Badge key={achievement.id} variant="secondary" className="text-sm py-1 px-3">
                    {achievement.emoji} {achievement.title}
                  </Badge>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}