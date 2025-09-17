import ScenarioChoice from '../ScenarioChoice';
import earthquakeImage from '@assets/generated_images/Earthquake_safety_scenario_choices_d6ed01c5.png';

const scenarioOptions = [
  {
    id: 'option1',
    text: 'Run outside immediately to get away from the building',
    isCorrect: false,
    feedback: 'Running outside during shaking is dangerous due to falling objects and debris. Most injuries occur when people try to move during the earthquake.'
  },
  {
    id: 'option2',
    text: 'Drop to hands and knees, take cover under the desk, and hold on',
    isCorrect: true,
    feedback: 'Excellent choice! Drop, Cover, and Hold On is the correct earthquake response. This protects you from falling objects and provides the best chance of avoiding injury.'
  },
  {
    id: 'option3',
    text: 'Stand in the doorway and hold onto the frame',
    isCorrect: false,
    feedback: 'This is outdated advice. Modern doorways are not stronger than other parts of buildings and you could be injured by the swinging door.'
  },
  {
    id: 'option4',
    text: 'Hide under the stairs',
    isCorrect: false,
    feedback: 'Stairs can collapse during earthquakes and are not safe shelter. Always choose a sturdy desk or table when available.'
  }
];

export default function ScenarioChoiceExample() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <ScenarioChoice
        title="Earthquake Response Scenario"
        description="Interactive emergency preparedness training"
        imageUrl={earthquakeImage}
        scenario="You are in a classroom when you suddenly feel the ground shaking. The earthquake is getting stronger and objects are starting to fall from shelves. You and your classmate need to take immediate action to stay safe."
        options={scenarioOptions}
        onComplete={(option, isCorrect) => console.log('Scenario completed:', { option, isCorrect })}
      />
    </div>
  );
}