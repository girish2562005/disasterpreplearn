import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Play, Pause } from 'lucide-react';

interface ScenarioOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

interface ScenarioChoiceProps {
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  scenario: string;
  options: ScenarioOption[];
  onComplete?: (selectedOption: string, isCorrect: boolean) => void;
}

export default function ScenarioChoice({
  title,
  description,
  imageUrl,
  videoUrl,
  scenario,
  options,
  onComplete
}: ScenarioChoiceProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return;
    
    setSelectedOption(optionId);
    setShowFeedback(true);
    
    const option = options.find(opt => opt.id === optionId);
    if (option) {
      onComplete?.(optionId, option.isCorrect);
    }
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const selectedOptionData = options.find(opt => opt.id === selectedOption);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl" data-testid={`text-scenario-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Media Section */}
        {(imageUrl || videoUrl) && (
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            {videoUrl ? (
              <div className="relative w-full h-full">
                {/* Video placeholder - in real app would be actual video */}
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    size="icon"
                    className="w-16 h-16 rounded-full bg-white/90 text-black hover:bg-white"
                    data-testid="button-play-video"
                  >
                    {isVideoPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-black/70 text-white">
                    {isVideoPlaying ? 'Playing' : 'Paused'}
                  </Badge>
                </div>
              </div>
            ) : imageUrl ? (
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
        )}

        {/* Scenario Description */}
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Scenario:</h3>
          <p className="text-muted-foreground">{scenario}</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <h3 className="font-semibold">What should you do?</h3>
          <div className="grid gap-3">
            {options.map((option, index) => {
              const isSelected = selectedOption === option.id;
              const showCorrect = showFeedback && option.isCorrect;
              const showIncorrect = showFeedback && isSelected && !option.isCorrect;
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={showFeedback}
                  className={`w-full text-left p-4 border rounded-lg transition-colors hover-elevate ${
                    isSelected ? 'border-primary bg-primary/5' : 'border-border'
                  } ${
                    showCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''
                  } ${
                    showIncorrect ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''
                  }`}
                  data-testid={`button-scenario-option-${index + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1 text-xs">
                        {String.fromCharCode(65 + index)}
                      </Badge>
                      <span className="flex-1">{option.text}</span>
                    </div>
                    {showFeedback && (
                      <div>
                        {option.isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && selectedOptionData && (
          <div className={`p-4 rounded-lg ${
            selectedOptionData.isCorrect 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200' 
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200'
          }`}>
            <div className="flex items-start gap-2">
              {selectedOptionData.isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
              )}
              <div>
                <h4 className="font-semibold mb-1">
                  {selectedOptionData.isCorrect ? 'Correct!' : 'Incorrect'}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {selectedOptionData.feedback}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <div></div>
          <div className="space-x-2">
            {showFeedback && !selectedOptionData?.isCorrect && (
              <Button onClick={handleTryAgain} variant="outline" data-testid="button-try-again">
                Try Again
              </Button>
            )}
            {showFeedback && selectedOptionData?.isCorrect && (
              <Button onClick={() => console.log('Continue to next scenario')} data-testid="button-continue-scenario">
                Continue
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}