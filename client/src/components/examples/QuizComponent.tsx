import QuizComponent from '../QuizComponent';

const sampleQuestions = [
  {
    id: 'q1',
    question: 'What is the correct response when you feel an earthquake starting?',
    options: [
      {
        id: 'a1',
        text: 'Run outside immediately',
        isCorrect: false,
        explanation: 'Running outside during shaking can be dangerous due to falling objects.'
      },
      {
        id: 'b1',
        text: 'Drop, Cover, and Hold On',
        isCorrect: true,
        explanation: 'This is the safest immediate response during earthquake shaking.'
      },
      {
        id: 'c1',
        text: 'Stand in a doorway',
        isCorrect: false,
        explanation: 'Modern doorways are not stronger than other parts of buildings.'
      },
      {
        id: 'd1',
        text: 'Get under a window',
        isCorrect: false,
        explanation: 'Windows can shatter and are not safe shelter spots.'
      }
    ],
    explanation: 'Drop, Cover, and Hold On is the universally recommended earthquake safety technique. Drop to hands and knees, take cover under a desk or table, and hold on to protect yourself from falling objects.'
  },
  {
    id: 'q2',
    question: 'How long should you perform CPR compressions before checking for a pulse?',
    options: [
      {
        id: 'a2',
        text: '30 seconds',
        isCorrect: false
      },
      {
        id: 'b2',
        text: '2 minutes',
        isCorrect: true
      },
      {
        id: 'c2',
        text: '5 minutes',
        isCorrect: false
      },
      {
        id: 'd2',
        text: '10 minutes',
        isCorrect: false
      }
    ],
    explanation: 'Perform CPR in 2-minute cycles before checking for signs of life. Continuous compressions are crucial for maintaining blood flow to vital organs.'
  }
];

export default function QuizComponentExample() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <QuizComponent
        title="Emergency Response Quiz"
        questions={sampleQuestions}
        passingScore={80}
        onComplete={(score, passed) => console.log('Quiz completed:', { score, passed })}
      />
    </div>
  );
}