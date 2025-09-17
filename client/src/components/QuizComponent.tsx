import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation: string;
}

interface QuizComponentProps {
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  onComplete?: (score: number, passed: boolean) => void;
}

export default function QuizComponent({ title, questions, passingScore, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const finalScore = isCompleted ? Math.round((score / questions.length) * 100) : 0;
  const passed = finalScore >= passingScore;

  const handleAnswerSelect = (optionId: string) => {
    if (showAnswer) return;
    setSelectedAnswer(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    setShowAnswer(true);
    const isCorrect = question.options.find(opt => opt.id === selectedAnswer)?.isCorrect;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => [...prev, question.id]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setIsCompleted(true);
      onComplete?.(finalScore, passed);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setAnsweredQuestions([]);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          <CardDescription>{title}</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-4">
            <div className="text-6xl font-bold text-primary" data-testid="text-final-score">
              {finalScore}%
            </div>
            <div className="flex items-center justify-center gap-2">
              {passed ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <Badge className="bg-green-600 text-white">Passed</Badge>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-600" />
                  <Badge className="bg-red-600 text-white">Failed</Badge>
                </>
              )}
            </div>
            <p className="text-muted-foreground">
              You answered {score} out of {questions.length} questions correctly.
              {!passed && ` You need ${passingScore}% to pass.`}
            </p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button onClick={handleRetakeQuiz} variant="outline" data-testid="button-retake-quiz">
              Retake Quiz
            </Button>
            {passed && (
              <Button onClick={() => console.log('Continue to next module')} data-testid="button-continue">
                Continue to Next Module
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant="outline">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" data-testid="progress-quiz" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4" data-testid={`text-question-${currentQuestion + 1}`}>
            {question.question}
          </h3>
          
          <div className="space-y-3">
            {question.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.isCorrect;
              const showCorrect = showAnswer && isCorrect;
              const showIncorrect = showAnswer && isSelected && !isCorrect;
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  disabled={showAnswer}
                  className={`w-full text-left p-4 border rounded-lg transition-colors hover-elevate ${
                    isSelected ? 'border-primary bg-primary/5' : 'border-border'
                  } ${
                    showCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : ''
                  } ${
                    showIncorrect ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''
                  }`}
                  data-testid={`button-option-${option.id}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.text}</span>
                    {showAnswer && (
                      <div>
                        {isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {showIncorrect && <XCircle className="w-5 h-5 text-red-600" />}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {showAnswer && (
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Explanation</h4>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Passing Score: {passingScore}%
          </div>
          <div className="space-x-2">
            {!showAnswer ? (
              <Button 
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                data-testid="button-submit-answer"
              >
                Submit Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                data-testid="button-next-question"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}