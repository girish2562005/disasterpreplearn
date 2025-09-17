import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Droplets, Shield, AlertTriangle, Clock, Play, CheckCircle, Lock } from 'lucide-react';
import emergencyImage from '@assets/generated_images/Emergency_medical_skills_illustration_3407c57b.png';

interface EmergencySkill {
  id: string;
  title: string;
  description: string;
  category: 'medical' | 'environmental' | 'first-aid' | 'preparation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  steps: string[];
  keyPoints: string[];
  warningPoints: string[];
  progress: number;
  isUnlocked: boolean;
  icon: any;
  emoji: string;
}

const emergencySkills: EmergencySkill[] = [
  {
    id: 'cpr-training',
    title: 'CPR Training',
    description: 'Learn cardiopulmonary resuscitation techniques to save lives during cardiac emergencies',
    category: 'medical',
    difficulty: 'intermediate',
    duration: '30 minutes',
    progress: 85,
    isUnlocked: true,
    icon: Heart,
    emoji: '❤️‍🩹',
    steps: [
      'Check responsiveness and breathing',
      'Call for emergency help (911)',
      'Position hands on center of chest',
      'Push hard and fast at least 2 inches deep',
      'Allow complete chest recoil between compressions',
      'Give 30 compressions at 100-120 per minute',
      'Provide 2 rescue breaths',
      'Continue 30:2 cycles until help arrives'
    ],
    keyPoints: [
      'Push hard, push fast - at least 2 inches deep',
      'Minimize interruptions in chest compressions',
      'Allow complete chest recoil between compressions',
      'Switch every 2 minutes to prevent fatigue'
    ],
    warningPoints: [
      'Do not perform CPR on someone who is conscious',
      'Do not be afraid to break ribs - this is normal',
      'Ensure scene safety before approaching victim'
    ]
  },
  {
    id: 'fainting-response',
    title: 'Fainting Response',
    description: 'Proper care for someone who has fainted or is about to faint',
    category: 'medical',
    difficulty: 'beginner',
    duration: '15 minutes',
    progress: 60,
    isUnlocked: true,
    icon: Droplets,
    emoji: '😵‍💫',
    steps: [
      'Ensure the person is safe from injury',
      'Check if they are responsive',
      'Position them on their back',
      'Elevate their legs 8-12 inches',
      'Loosen tight clothing',
      'Check breathing and pulse',
      'Do not give food or water immediately',
      'Monitor until they recover completely'
    ],
    keyPoints: [
      'Most fainting episodes resolve within 1-2 minutes',
      'Elevating legs helps blood return to the brain',
      'Fainting can be caused by dehydration, heat, or medical conditions'
    ],
    warningPoints: [
      'Call 911 if person doesn\'t regain consciousness within 1 minute',
      'Do not leave an unconscious person alone',
      'Seek medical attention if fainting occurs frequently'
    ]
  },
  {
    id: 'ors-preparation',
    title: 'ORS Preparation',
    description: 'Prepare oral rehydration solution for dehydration and diarrhea treatment',
    category: 'preparation',
    difficulty: 'beginner',
    duration: '10 minutes',
    progress: 90,
    isUnlocked: true,
    icon: Droplets,
    emoji: '🥤',
    steps: [
      'Wash hands thoroughly with soap',
      'Boil 1 liter (4 cups) of clean water',
      'Let water cool to room temperature',
      'Add 1/2 teaspoon of salt',
      'Add 2 tablespoons of sugar',
      'Stir until completely dissolved',
      'Taste - should be no saltier than tears',
      'Use within 24 hours if kept cool'
    ],
    keyPoints: [
      'Use clean, boiled water only',
      'Exact measurements are critical',
      'Give small, frequent sips',
      'Continue normal feeding when possible'
    ],
    warningPoints: [
      'Too much salt can worsen dehydration',
      'Discard after 24 hours',
      'Seek medical help if vomiting persists'
    ]
  },
  {
    id: 'bee-sting-treatment',
    title: 'Bee Sting Treatment',
    description: 'First aid for bee stings and recognition of allergic reactions',
    category: 'first-aid',
    difficulty: 'beginner',
    duration: '20 minutes',
    progress: 40,
    isUnlocked: true,
    icon: Shield,
    emoji: '🐝',
    steps: [
      'Remove the stinger immediately by scraping',
      'Do not use tweezers (may inject more venom)',
      'Wash the area with soap and water',
      'Apply ice for 15-20 minutes',
      'Take pain relievers if needed',
      'Apply antihistamine cream or take oral antihistamine',
      'Monitor for signs of allergic reaction',
      'Keep the area elevated if possible'
    ],
    keyPoints: [
      'Remove stinger as quickly as possible',
      'Ice helps reduce swelling and pain',
      'Most reactions are local and not dangerous'
    ],
    warningPoints: [
      'Call 911 for signs of severe allergic reaction',
      'Watch for difficulty breathing, swelling of face/throat',
      'Use EpiPen if prescribed and available'
    ]
  },
  {
    id: 'snake-bite-emergency',
    title: 'Snake Bite Emergency',
    description: 'Critical response to snake bite incidents - time-sensitive emergency care',
    category: 'medical',
    difficulty: 'advanced',
    duration: '45 minutes',
    progress: 25,
    isUnlocked: true,
    icon: AlertTriangle,
    emoji: '🐍',
    steps: [
      'Stay calm and keep victim still',
      'Call emergency services immediately',
      'Remove jewelry and tight clothing near bite',
      'Keep the bite area below heart level',
      'Clean bite gently with soap and water',
      'Cover with clean, loose bandage',
      'Mark swelling edge with time noted',
      'Monitor vital signs and symptoms'
    ],
    keyPoints: [
      'Time is critical - get medical help immediately',
      'Do not move victim unnecessarily',
      'Try to identify snake if safe to do so',
      'Antivenom is the only effective treatment'
    ],
    warningPoints: [
      'Never cut the bite or try to suck out venom',
      'Do not apply ice or tourniquets',
      'Do not give alcohol or caffeine',
      'Do not wait for symptoms to worsen'
    ]
  },
  {
    id: 'choking-response',
    title: 'Choking Response',
    description: 'Heimlich maneuver and back blows for choking emergencies',
    category: 'medical',
    difficulty: 'intermediate',
    duration: '25 minutes',
    progress: 0,
    isUnlocked: false,
    icon: AlertTriangle,
    emoji: '🫁',
    steps: [
      'Recognize signs of choking',
      'Ask "Are you choking?" (universal choking sign)',
      'Perform 5 back blows between shoulder blades',
      'If unsuccessful, perform abdominal thrusts',
      'Place hands above navel, below rib cage',
      'Pull sharply inward and upward',
      'Continue until object is expelled',
      'Call emergency services if needed'
    ],
    keyPoints: [
      'Signs include inability to speak, blue skin, grasping throat',
      'Alternate between back blows and abdominal thrusts',
      'Different technique for infants and pregnant women'
    ],
    warningPoints: [
      'Do not perform on someone who can speak or cough',
      'Be careful not to injure ribs',
      'Seek medical attention even after successful removal'
    ]
  }
];

interface EmergencySkillsGridProps {
  onSkillStart?: (skillId: string) => void;
}

export default function EmergencySkillsGrid({ onSkillStart }: EmergencySkillsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<EmergencySkill | null>(null);

  const categories = [
    { id: 'all', name: 'All Skills', icon: Shield },
    { id: 'medical', name: 'Medical', icon: Heart },
    { id: 'first-aid', name: 'First Aid', icon: Shield },
    { id: 'preparation', name: 'Preparation', icon: Droplets },
    { id: 'environmental', name: 'Environmental', icon: AlertTriangle }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? emergencySkills 
    : emergencySkills.filter(skill => skill.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medical': return 'bg-red-50 border-red-200';
      case 'first-aid': return 'bg-blue-50 border-blue-200';
      case 'preparation': return 'bg-green-50 border-green-200';
      case 'environmental': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">🚑</div>
        <h2 className="text-3xl font-bold" data-testid="text-emergency-skills-title">
          Emergency Skills Training
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn essential life-saving techniques for various emergency situations. 
          From CPR to snake bites, master the skills that could save lives. 💪
        </p>
      </div>

      {/* Hero Image */}
      <Card className="overflow-hidden">
        <div className="relative h-64 bg-gradient-to-r from-red-50 to-blue-50">
          <img 
            src={emergencyImage} 
            alt="Emergency Skills Training"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-bold">Master Life-Saving Skills</h3>
            <p className="text-sm">Be prepared for any emergency situation</p>
          </div>
        </div>
      </Card>

      {/* Category Filter */}
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
              <Icon className="w-4 h-4" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => {
          const Icon = skill.icon;
          return (
            <Card 
              key={skill.id}
              className={`hover-elevate transition-all duration-300 ${getCategoryColor(skill.category)} ${
                skill.isUnlocked ? 'cursor-pointer' : 'opacity-70'
              }`}
              data-testid={`card-skill-${skill.id}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{skill.emoji}</div>
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {skill.title}
                        {!skill.isUnlocked && <Lock className="w-4 h-4" />}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getDifficultyColor(skill.difficulty)}>
                          {skill.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {skill.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-sm mt-2">
                  {skill.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {skill.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                )}

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedSkill(skill)}
                        data-testid={`button-learn-${skill.id}`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <span className="text-2xl">{skill.emoji}</span>
                          {skill.title}
                        </DialogTitle>
                        <DialogDescription>
                          {skill.description}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* Steps */}
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Step-by-Step Procedure
                          </h4>
                          <ol className="space-y-2">
                            {skill.steps.map((step, index) => (
                              <li key={index} className="flex gap-3">
                                <Badge variant="outline" className="mt-0.5 text-xs">
                                  {index + 1}
                                </Badge>
                                <span className="text-sm">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Key Points */}
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-600">
                            💡 Key Points to Remember
                          </h4>
                          <ul className="space-y-1">
                            {skill.keyPoints.map((point, index) => (
                              <li key={index} className="flex gap-2 text-sm">
                                <span className="text-blue-500">•</span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Warnings */}
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-600">
                            ⚠️ Important Warnings
                          </h4>
                          <ul className="space-y-1">
                            {skill.warningPoints.map((warning, index) => (
                              <li key={index} className="flex gap-2 text-sm">
                                <span className="text-red-500">•</span>
                                {warning}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button 
                    size="sm"
                    disabled={!skill.isUnlocked}
                    onClick={() => onSkillStart?.(skill.id)}
                    className="gap-2"
                    data-testid={`button-start-${skill.id}`}
                  >
                    <Play className="w-4 h-4" />
                    {skill.progress > 0 ? 'Continue' : 'Start'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Statistics */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {emergencySkills.filter(s => s.isUnlocked).length}
              </div>
              <div className="text-sm text-muted-foreground">Skills Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {emergencySkills.filter(s => s.progress === 100).length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {emergencySkills.filter(s => s.progress > 0 && s.progress < 100).length}
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(emergencySkills.reduce((acc, s) => acc + s.progress, 0) / emergencySkills.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}